const mongoose=require('mongoose');

const schema=mongoose.Schema(
    {
        id:{
            type: Number,
            unique: true,
            required: true
        },
        name: {
            type: String,
            // required: true
        },
        age:{
            type: Number
        },
        email: {
            type: String,
            unique: true,
            // required: true
        },
        password: {
            type: String,
            // required: true
        }
    },
    {
        timestamps: true
    }
);

const User=mongoose.model('User', schema);

module.exports=User;