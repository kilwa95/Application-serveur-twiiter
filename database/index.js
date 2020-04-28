const mongoose = require('mongoose');
const env = require(`../environment/${ process.env.NODE_ENV }`);


 mongoose.connect(env.dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connexion ok")
}).catch(error => {
    console.log(error);
})



