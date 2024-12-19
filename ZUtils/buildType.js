try {
    require('dotenv').config()
}
catch (er) { }
function getBuildType() {
    return process.env.BUILD_TYPE;
}

function getEnvType() {
    return process.env.ENVIRONMENT;
}


module.exports = { BUILD_TYPE: getBuildType(), ENVIRONMENT: getEnvType() }