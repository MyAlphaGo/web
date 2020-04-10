'use strict'

const Controller = require('egg').Controller;
const md5 = require('md5')

class LoginController extends Controller {
    async login() {
        const { ctx, app } = this
        const { userId, password } = ctx.params
        let isExist = await ctx.service.mysql.findById(userId,'User')
        if (isExist === null) {
            ctx.status = 403
            ctx.body = {
                success: 0,
                message: '账号信息不存在'
            }
        } else if (md5(isExist.dataValues.password + ctx.session.time) !== password) {
            ctx.status = 200;
            ctx.body = {
                success: 0,
                message: '密码错误',
            };
        } else if (isExist.dataValues.status === 0) {
            ctx.status = 200;
            ctx.body = {
                success: 0,
                message: '账号正在审核中，请联系管理员。',
            };
        } else {
            ctx.status = 200;
            const token = await ctx.service.jwt.sign(userId);
            ctx.body = {
                success: 1,
                data: {
                    token,
                },
            };
        }
    }
    async getTime() {
        const time = Date.now();
        this.ctx.session.time = time;
        this.ctx.body = {
            success: 1,
            data: time,
        };
    }
}

module.exports = LoginController;