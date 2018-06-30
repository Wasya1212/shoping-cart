import React, {Component} from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validateForm() {
    return this.state.email.length > 5 && this.state.password.length > 4;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.getData({
      email: this.state.email,
      password: this.state.password
    });
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return pug`
      .login
        form(onSubmit=this.handleSubmit)
          p
            input(type="email", placeholder="email", name="email", value=this.state.email, onChange=this.handleChange).email
          p
            input(type="password", placeholder="password", name="password", value=this.state.password, onChange=this.handleChange).password
          p
            input(type="submit", value="Confirm", disabled=!this.validateForm()).button
    `;
  }
}
