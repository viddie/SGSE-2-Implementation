const { json } = require("express")
const express = require("express")
const router = express.Router()
const User = require('../models/ratings')

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const accessTokenSecret = 'somerandomaccesstoken';

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.validUser = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

// Getting all
router.get('/', authenticateJWT, async (req,res) =>
{
    try{
        const users = await User.find()
        res.json(users)
    }catch(err)
    {
        res.status(500).json({message: err.message})
    }
})

// Getting one
router.get('/UserID/:id',authenticateJWT, userTokenAcces, (req,res) =>
{
    res.json(res.tokenuser)
})

router.post("/CreateUser",authenticateJWT, async (req,res) =>
{
    const user = new User({
        ID: req.validUser.id 
    })

    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

router.post('/UserID/:id/Rating/:star_num',authenticateJWT, getUser, async (req,res) =>
{
  
    res.user.RaterIDs.push(req.validUser.id);
    
    
    if(req.params.star_num == "1"){
        try{
            res.user.One_Star = res.user.One_Star + 1
            res.user.avgStar = (res.user.totalRatings*res.user.avgStar + 1)/(res.user.totalRatings+1)
            res.user.totalRatings = res.user.totalRatings + 1
            const updatedUser = await res.user.save()              
            res.json(updatedUser)
        }catch (err){
            res.status(400).json({message: err.message})
        }
        }
    if(req.params.star_num == "2"){
        try{
            res.user.Two_Star = res.user.Two_Star + 1
            res.user.avgStar = (res.user.totalRatings*res.user.avgStar + 2)/(res.user.totalRatings+1)
            res.user.totalRatings = res.user.totalRatings + 1
            const updatedUser = await res.user.save()  
            res.json(updatedUser)
        }catch (err){
            res.status(400).json({message: err.message})
        }
        }
    if(req.params.star_num == "3"){
        try{
            res.user.Three_Star = res.user.Three_Star + 1
            res.user.avgStar = (res.user.totalRatings*res.user.avgStar + 3)/(res.user.totalRatings+1)
            res.user.totalRatings = res.user.totalRatings + 1
            const updatedUser = await res.user.save()  
            res.json(updatedUser)
        }catch (err){
            res.status(400).json({message: err.message})
        }
        }
    if(req.params.star_num == "4"){
        try{
            res.user.Four_Star = res.user.Four_Star + 1
            res.user.avgStar = (res.user.totalRatings*res.user.avgStar + 4)/(res.user.totalRatings+1)
            res.user.totalRatings = res.user.totalRatings + 1
            const updatedUser = await res.user.save()   
            res.json(updatedUser)
        }catch (err){
            res.status(400).json({message: err.message})
        }
        }
    if(req.params.star_num == "5"){
        try{
        res.user.Five_Star = res.user.Five_Star + 1
        res.user.avgStar = (res.user.totalRatings*res.user.avgStar + 5)/(res.user.totalRatings+1)
        res.user.totalRatings = res.user.totalRatings + 1
        const updatedUser = await res.user.save()   
        res.json(updatedUser)
    }catch (err){
        res.status(400).json({message: err.message})
    }
    }
})

router.delete('/:id',authenticateJWT, getUser, async (req,res) =>
{
    try{
        await res.user.remove()
        res.json({message: 'Deleted User'})
    }catch (err)
    {
        res.status(500).json({message: err.message})
    }
})


async function getUser(req, res, next){
    try{
        user = await User.findOne({ID: req.params.id})
        
        if(user == null){
            const newUser = new User({
                ID: req.params.id,
            })
            try{
                user = await newUser.save()
            }catch(err){
                return res.status(400).json({message: err.message})
            }
        }
        else{
            try{
                doubleRating = await User.findOne({ID: req.params.id}, 
                    {RaterIDs: req.validUser.id})
                if(doubleRating){
                    return res.status(404).json({message: 'Already Rated'})
                }
            }catch(err)
            {
                return res.status(500).json({message: err.message})
            }
        }
    }catch (err)
    {
        return res.status(500).json({message: err.message})
    }
    res.user = user
    next()
}

async function userTokenAcces(req, res, next){
    try{
        user = await User.findOne({ID: req.params.id})

        if(user == null){
            return res.status(404).json({message: 'Invalid User'})
        }
    }catch (err)
    {
        return res.status(500).json({message: err.message})
    }
    res.tokenuser = user
    next()
}


module.exports = router
