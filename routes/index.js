const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})


module.exports = router //whenever this file is imported inside of application, there is information to be exported