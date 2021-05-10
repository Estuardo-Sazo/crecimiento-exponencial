require('dotenv').config();
module.exports = {
    api: {
        port: process.env.API_PORT || 5000,
        host: process.env.API_HOST || localhost,

    }
}