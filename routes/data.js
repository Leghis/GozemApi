const express = require('express')
const request = require('request')
const functions = require('../controllers/functions')
const utils = require('../utils/utils')
const router = new express.Router()



router.post('/api/get_distance_and_time', async (req, res) => {
    var util = new utils()
    util.latitudeStart = req.body.start.lat
    util.longitudeStart = req.body.start.lng
    util.latitudeEnd = req.body.end.lat
    util.longitudeEnd = req.body.end.lng
    util.unit = req.body.units

    functions.timezone(util.latitudeStart , util.longitudeStart, res,0, util)
    functions.timezone(util.latitudeEnd , util.longitudeEnd, res,1, util)

})

module.exports = router
