const mongoose = require('mongoose');


 mongoose.connect('mongodb+srv://khaled:taylor95@cluster0-aezni.gcp.mongodb.net/twitter?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connexion ok")
}).catch(error => {
    console.log(error);
})



