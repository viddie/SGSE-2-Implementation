const { json } = require("express")
const express = require("express")
const router = express.Router()
const Configuration = require('../models/configuration')

router.get('/:userID', getConfig, (req,res) =>
{
    res.json(res.config)
})

router.post('/', async (req, res) =>
{
    const config = new Configuration({
        id: req.body.id,
        userID: req.body.userID,
        allowMessages: req.body.allowMessages,
        openChatOnNewMessage: req.body.openChatOnNewMessage,
        fontSize: req.body.fontSize,
        windowSize: req.body.windowSize
    })

    try {
        const newConfig = await config.save()
        res.status(201).json(newConfig)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

router.patch('/:userID', getConfig, async (req,res) =>
{
    if (req.body.allowMessages != null) {
        res.configuration.allowMessages = req.body.allowMessages
    }

    if (req.body.openChatOnNewMessage != null) {
        res.configuration.openChatOnNewMessage = req.body.openChatOnNewMessage
    }

    if (req.body.fontSize != null) {
        res.configuration.fontSize = req.body.fontSize
    }

    if (req.body.windowSize != null) {
        res.configuration.windowSize = req.body.windowSize
    }

    try {
        const updatedConfiguration = await res.configuration.save()
        res.json(updatedConfiguration)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

async function getConfig(req, res, next){
    try {
        config = await Configuration.findOne({
            userID: req.params.userID
        })
        if(config == null) {
            return res.status(404).json({message: 'Invalid MessageID'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.config = config
    next()
}

module.exports = router