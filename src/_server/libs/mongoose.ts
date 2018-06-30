import mongoose from 'mongoose';
import * as beautifyUnique from 'mongoose-beautiful-unique-validation';

const connectOptions = {
  poolSize: 10,
  reconnectInterval: 1000,
  connectTimeoutMS: 2000,
  keepAlive: 80,
  reconnectTries: 25
};

mongoose.connect('mongodb://localhost/shop', connectOptions)
  .then(() => {
    console.log("Connect to mongo!");
  })
  .catch(err => {
    console.error(err);
  });

// mongoose.plugin(beautifyUnique);
mongoose.Promise = Promise;

export default mongoose;
