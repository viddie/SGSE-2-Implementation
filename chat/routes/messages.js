const { json } = require("express")
const express = require("express")
const router = express.Router()
const Message = require('../models/message')
const jwt = require('jsonwebtoken')

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
        const messages = await Message.find()
        res.json(messages)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/:room', authenticateJWT, getMessages, (req,res) =>
{
    res.json(res.messages)
})

router.get('/receive/:receiver', authenticateJWT, getUserSpecific, (req, res) =>
{
    res.json(res.messages)
})

router.get('/receive/:receiver/:sender', authenticateJWT, getSenderSpecific, (req, res) =>
{
    res.json(res.messages)
})

router.post('/send', authenticateJWT, async (req, res) =>
{
    const message = new Message({
        room: req.body.room,
        sender: req.body.sender,
        senderID: req.body.senderID,
        receiver: req.body.receiver,
        text: req.body.text,
        timestamp: req.body.timestamp
    })

    try {
        const newMessage = await message.save()
        res.status(201).json(newMessage)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

async function getMessages(req, res, next){
    try{
        messages = await Message.find({
            room: req.params.room
        }).limit(500)
        if(messages == null){
            return res.status(404).json({messages: 'Invalid chatroomID'})
        }
    } catch (err) {
        return res.status(500).json({messages: err.message})
    }
    res.messages = messages
    next()
}

async function getUserSpecific(req, res, next) {
    try{
        messages = await Message.find({
            receiver: req.params.receiver
        }).limit(500)
        if(messages == null){
            return res.status(404).json({messages: 'Invalid Sender'})
        }
    } catch (err) {
        return res.status(500).json({messages: err.message})
    }
    res.messages = messages
    next()
}

async function getSenderSpecific(req, res, next) {
    try{
        messages = await Message.find({
            sender: req.params.sender,
            receiver: req.params.receiver
        }).limit(500)
        if(messages == null){
            return res.status(404).json({messages: 'Invalid Sender'})
        }
    } catch (err) {
        return res.status(500).json({messages: err.message})
    }
    res.messages = messages
    next()
}

module.exports = router
