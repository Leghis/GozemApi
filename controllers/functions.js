const axios = require('axios')
const result = require('../utils/result')

function distanceDuree(util,res) {
    url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+util.latitudeStart+","+util.longitudeStart+"&destinations=side_of_road:"+util.latitudeEnd+","+util.longitudeEnd+"&key=AIzaSyBrRh0NjtrSopoOrG-4_W3OP0nmzSDQK-M"
    axios.get(url)
        .then((response) => {
            result.data.start.location = {"lat": util.latitudeStart, "lng": util.longitudeStart}
            result.data.end.location = {"lat": util.latitudeEnd, "lng": util.longitudeEnd}
            result.data.distance.units = "KM"
            result.data.distance.value = response.data.rows[0].elements[0].distance.value / 1000
            result.data.time_diff.units = "hours"
            result.data.time_diff.value = Math.round(response.data.rows[0].elements[0].duration.value*100 / 3600)/100

            //START
           let dataLocation = response.data.origin_addresses
            let location = dataLocation[0]
            let countryStart = location.split(",")
            // console.log(tab[tab.length - 1])
            result.data.start.country = countryStart[countryStart.length - 1]

            //END
            let dataLocation2 = response.data.origin_addresses
            let location2 = dataLocation2[0]
            let countryStart2 = location2.split(",")
            // console.log(tab[tab.length - 1])
            result.data.end.country = countryStart2[countryStart2.length - 1]


            res.send(result.data)
        })
        .catch((error) => {
            console.log(error)
            res.status(400).send(error)
        })

}


function timezone(latitude, longitude, res, position, util) {
    let url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + latitude + ',' + longitude + '&timestamp=1458000000&key=AIzaSyBrRh0NjtrSopoOrG-4_W3OP0nmzSDQK-M'
    axios.get(url)
        .then((response) => {
            if (position == 0) {
                if((response.data.rawOffset / 3600) >= 0 ){
                    result.data.start.timezone = "GMT+" + (response.data.rawOffset / 3600)
                }else {
                    result.data.start.timezone = "GMT" + (response.data.rawOffset / 3600)
                }
            } else if (position == 1) {
                if((response.data.rawOffset / 3600) >= 0 ){
                    result.data.end.timezone = "GMT+" + (response.data.rawOffset / 3600)
                }else {
                    result.data.end.timezone = "GMT" + (response.data.rawOffset / 3600)
                }
                distanceDuree(util,res)

            }

        })
        .catch((error) => {
            console.log(error)
            res.status(400).send(error)
        })

}

module.exports = {
    timezone: timezone,
    distanceDuree:distanceDuree
}
