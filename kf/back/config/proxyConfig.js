const dev = require('./dev.env.js')

module.exports = {
    '/pokerclubs': {
        target: `${dev.AXIOS_API}/pokerclubs`,
        changeOrigin: true,
        pathRewrite: {
            '^/pokerclubs': ''
        }
    }
}