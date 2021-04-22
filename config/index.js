require('dotenv').config();
module.exports = {
    api: {
        port: process.env.API_PORT || 3020,
        host: process.env.API_HOST || localhost,

    }
}