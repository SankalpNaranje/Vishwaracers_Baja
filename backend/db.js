const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://sankalpnaranje:fXS0xaPWICumogcT@cluster0.ikjwetx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connectToMongo = async() => {
     mongoose.set('strictQuery', false);
  
    return mongoose.connect(mongoURI)
      .then(() => {
        console.log('Mongo connected successfully');
      })
      .catch((error) => {
        console.log(error);
        process.exit();
      });
  };
module.exports = connectToMongo;