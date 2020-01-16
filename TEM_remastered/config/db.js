const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const connectDB = async () => {
  try {
    mongoose.connect('mongodb://127.0.0.1:27017/todos', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const connection = mongoose.connection;

    connection.once('open', function() {
      console.log('MongoDB database connection established successfully');
    });
  } catch (error) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
