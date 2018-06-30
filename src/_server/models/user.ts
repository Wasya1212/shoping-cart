import mongoose from '../libs/mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: "email is already registrated!",
    lovercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);
