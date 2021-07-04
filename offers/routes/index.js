const router = require('express').Router();
const path = require('path');

router.use('/api-docs', require('./api-docs'));
router.use('/', require('./api'));

// Testseite zur Verfügung stellen wenn in Entwicklungsphase
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/advertise.html'));
});

module.exports = router;