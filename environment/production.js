const path = require('path');

module.exports = {
  dbUrl: 'mongodb+srv://khaled:taylor95@cluster0-aezni.gcp.mongodb.net/twitter?retryWrites=true&w=majority',
  cert: path.join( __dirname, ''),
  key: path.join( __dirname, ''),
}