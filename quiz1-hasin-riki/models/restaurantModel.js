const mongoose=require('mongoose');

const schema=mongoose.Schema(
    {
        restaurantId:{
            type: Number,
            unique: true,
            required: true,
        },
        title: {
            type: String,
            required: true
        },
        tagline:{
            type: String
        },
        website: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        logo: {
            type: String,
            required: true
        }
    }
);

const Restaurant=mongoose.model('Users', schema);

module.exports=Restaurant;