const { json } = require("express")
const express = require("express")
const router = express.Router()
const User = require('../models/ratings')

// Getting all
router.get('/', async (req,res) =>
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
router.get('/UserID/:id', getUser, (req,res) =>
{
    res.json(res.user)
})

router.post("/CreateUser/:id", async (req,res) =>
{
    const user = new User({
        ID: req.params.id 
    })

    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
router.post("/CreateUser/:id", async (req,res) =>
{
    const user = new User({
        ID: req.params.id 
    })

    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

router.patch('/UserID/:id/Rating/:star_num', getUser, async (req,res) =>
{
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

router.delete('/:id', getUser, async (req,res) =>
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
            return res.status(404).json({message: 'Invalid User'})
        }
    }catch (err)
    {
        return res.status(500).json({message: err.message})
    }
    res.user = user
    next()
}

// function calcAverage(tempUser)
// {
//     if(amountOfStars > 0)
//         return (5*tempUser.Five_Star+4*tempUser.Four_Star+
//             3*tempUser.Three_Star+2*tempUser.Two_Star+tempUser.One_Star)/(tempUser.Five_Star+tempUser.Four_Star+
//                 tempUser.Three_Star+tempUser.Two_Star+tempUser.One_Star) 
//     else
//         return 0
// }

module.exports = router
