import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Login from './components/Login.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  login({email, password}) {
    axios.post('/login', {
      username: email,
      password: password
    }).then(({status: statusCode, data}) => {
      if (statusCode !== 200) {
        console.error("Error! Code:", statusCode)
      } else {
        console.log("OK", data);
      }
    }).catch(err => {
      console.error(err);
    });
  }

  render() {
    return pug`
      Login(getData=this.login)
    `;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
