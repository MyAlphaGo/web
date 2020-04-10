'use strict'

const Service = require('egg').Service;
const JWT = require("jsonwebtoken")

class JwtService extends Service {
    async sign(params) {
        
        const { config } = this;
        console.log(config.jwt.secret)
        const token = JWT.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 15, // 15分钟
                data: params,
            },
            config.jwt.secret
        );
        return token;
    }
}

module.exports = JwtService;