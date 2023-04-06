const express=require('express');
const app=express();
require('dotenv').config();
const mongoose=require('mongoose');
const Restaurant=require('./models/restaurantModel');
const Meals=require('./models/mealsModel')

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_LINK).then(()=>{
    console.log("Connected to Mongodb...")
    app.listen(3000, ()=>{
        console.log("Node running on port 3000");
    });
}).catch((error)=>{
    console.log(error);
});

const createMeals = async(req,res)=>{
    try {
        const meals=await Meals.create(req.body);
        res.status(200).json(meals);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}

const getData=async(req,res)=>{
    try {
        // const data=Restaurant.aggregate([
        //     {
        //         $lookup: {
        //             from: 'Meals',
        //             localField: 'restaurantId',
        //             foreignField: 'restaurantId',
        //             as: 'restaurant_meals'
        //         }
        //     }
        // ]);

        data=[];
        const restaurants=await Restaurant.find({});
        for(let i=0; i<restaurants.length;i++){
            const meals=await Meals.find({restaurantId: restaurants[i].restaurantId});
            data.push({...(restaurants[i]._doc),meals})
        }

        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}

app.use(express.json());

app.post('/meals', createMeals)

app.get('/quiz', getData);

