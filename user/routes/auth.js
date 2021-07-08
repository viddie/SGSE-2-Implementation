const { json } = require("express")
const express = require("express")
const router = express.Router()
const User = require('../models/auth')

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

let refreshTokens = [];
const accessTokenSecret = 'somerandomaccesstoken';
const refreshTokenSecret = 'somerandomstringforrefreshtoken';

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

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

router.post("/signup", SignUp, async (req,res) =>
{
    console.log(emailRegexp.test(req.body.email));
    const user = new User({
        
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        email: req.body.email  
    })

    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

router.post('/login', getUser, (req, res) => {
    // read username and password from request body
    const { username, password } = req.body;

    //res.json(res.user)

    // filter user from the users array by username and password
    const validuser = res.user;

    //res.json(res.user.username)

    if (res.user) {
        // generate an access token
        const accessToken = jwt.sign({ username: res.user.username, role: res.user.role, id: res.user._id, email: res.user.email }, accessTokenSecret, { expiresIn: '1m' });
        const refreshToken = jwt.sign({ username: res.user.username, role: res.user.role,id: res.user._id, email: res.user.email  }, refreshTokenSecret);

        refreshTokens.push(refreshToken);

        res.json({
            accessToken,
            refreshToken
        });
    } else {
        res.send('Username or password incorrect');
    }
});


router.post('/token', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ username: user.username, role: user.role, id: user.id, email: user.email}, accessTokenSecret, { expiresIn: '1m' });

        res.json({
            accessToken
        });
    });
});

router.post('/logout', (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);

    res.send("Logout successful");
});


router.delete('/', deleteUser, async (req,res) =>
{
    try{
        await User.remove()
        res.json({message: 'Deleted User'})
    }catch (err)
    {
        res.status(500).json({message: err.message})
    }
})


async function getUser(req, res, next){
    try{
        user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });

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

async function SignUp(req, res, next){
    try{
        user = await User.findOne({
            username: req.body.username,
        });

        if(user != null){
            return res.status(403).json({message: 'User already exists'})
        }
    }catch (err)
    {
        return res.status(500).json({message: err.message})
    }
    next()
}

async function deleteUser(req, res, next){
    try{
        userToDelete = await User.findById(req.params.id);

        if(user == null){
            return res.status(404).json({message: 'Invalid User'})
        }
    }catch (err)
    {
        return res.status(500).json({message: err.message})
    }
    res.userToDelete = userToDelete
    next()
}


module.exports = router
