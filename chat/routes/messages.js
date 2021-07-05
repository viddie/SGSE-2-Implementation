const { json } = require("express")
const express = require("express")
const router = express.Router()
const Message = require('../models/message')

// Getting all
router.get('/', async (req,res) =>
{
    try{
        const messages = await Message.find()
        res.json(messages)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

// Getting one
router.get('/:id', getMessage, (req,res) =>
{
    res.json(res.message)
})

router.get('/receive/:sender', getUserSpecific, (req, res) =>
{
    res.json(res.messages)
})

router.post('/send', async (req, res) =>
{
    const message = new Message({
        id: req.body.id,
        sender: req.body.sender,
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

async function getMessage(req, res, next){
    try{
        message = await Message.findById(req.params.id)
        if(message == null){
            return res.status(404).json({message: 'Invalid MessageID'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.message = message
    next()
}

async function getUserSpecific(req, res, next) {
    try{
        messages = await Message.findOne({
            sender: req.params.sender
        })
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