
exports.checkUserAuthorization = function (userID, access) {
    return new Promise(resolve => {
        // Hier wird der User Micorservice angepingt ob der Token okay ist
        // Unterscheidung in Lese und Schreibrechte
        if (access == "r") {
            resolve(true)
        } else if (access == "w") {
            resolve(true)
        } else {
            resolve(false)
        }
    })  
}