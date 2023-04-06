const express=require('express');
const app=express();
require('dotenv').config();
const Error=require('http-errors');
const UserRoutes=require('./routes/userRoutes');
const mongoose=require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_LINK).then(()=>{
    console.log("Connected to Mongodb...")
    app.listen(3000, ()=>{
        console.log("Node running on port 3000");
    });
}).catch((error)=>{
    console.log(error);
});

//routes
app.get('/',(req,res)=>{
    res.send('Assignment 2 JWT Authentication');
});

app.use(express.json());

//catch wrong route
// app.use(async(req, res, next)=>{
//     next(Error.NotFound());
// });

// //error handler 
// app.use((err, req, res)=>{
//     res.status(err.status || 500);
//     res.send({
//         error: {
//             status: err.status || 500,
//             message: err.message,
//         },
//     })
// });

app.use('/user', UserRoutes);

