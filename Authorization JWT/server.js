require('dotenv').config();

const express=require('express');
const app=express();
app.use(express.json());

const jwt=require('jsonwebtoken');

const posts=[
    {
        username: 'Ali',
        title: 'user1'
    },
    {
        username: 'Imran',
        title: 'user2'
    }
];

app.get('/posts', authenticateToken, (req,res)=>{
    res.json(posts.filter(post => post.username===req.user.name));
});

function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];//if authHeader then store authHeader.split(' ')[1]

    if(token==null){
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err){
            return res.sendStatus(403);
        }
        req.user=user;
        next();//executes code after all the middleware function is finished
    });
}

app.listen(3000);

