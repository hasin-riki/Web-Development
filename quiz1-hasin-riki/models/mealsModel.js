const mongoose=require('mongoose');

const schema=mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        meals: [{
            meal:{
                type: String,
            },
            mb:{
                type: Boolean
            }
        }],
        restaurantId:{
            type: Number,
            required: true
        }
    },
);

const Meals=mongoose.model('Meals', schema);

module.exports=Meals;