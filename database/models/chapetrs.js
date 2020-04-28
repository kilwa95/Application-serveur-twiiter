const mongoose = require('mongoose');
const schema = mongoose.Schema;


const chapitreSchema = schema({
    title: {
        type: String,
        required: [true,'le titre est obligatoire'],
        minlength: 3,
        maxlength: 8,
    },

    nbrOfLesson:{
        type: Number,
        required: [true,'nbrOfLesson est obligatoire'],
        minlength: 3,
        maxlength: 8,
    },
    active: Boolean,
    index: Number,
}, {
    timestamps: true
})

chapitreSchema.pre('save', async function(){
    let nombreChapetrs = await Chapters.countDocuments();
    let compteurIndex =  this.index = nombreChapetrs + 1;
    return compteurIndex;
})

const Chapters = mongoose.model('chapetrs', chapitreSchema)

module.exports = Chapters;