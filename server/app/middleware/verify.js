'use strict';

const JWT = require("jsonwebtoken")

module.exports = option => {
    return async function verify(ctx, next) {
        const token = ctx.header.authorization
        const method = ctx.method.toLowerCase();
        // 当前请求时get请求，执行接下来的中间件
        if (method === 'get') {
            await next();
            // 当前token值不存在的时候
        } else if (!token) {
            if (ctx.path === '/api/register' || ctx.path === '/api/login') {
                await next();
            } else {
                ctx.throw(401, '未登录， 请先登录');
            }
        } else { // 当前token值存在
            let decode;
            try {
                // 验证当前token
                decode = JWT.verify(token, ctx.app.config.jwt.secret);
                if (!decode || !decode.userName) {
                    ctx.throw(401, '没有权限，请登录');
                }
                if (Date.now() - decode.expire > 0) {
                    ctx.throw(401, 'Token已过期');
                }
                const user = await ctx.model.User.find({
                    userName: decode.userName,
                });
                if (user) {
                    await next();
                } else {
                    ctx.throw('401', '用户信息验证失败');
                }
            } catch (e) {
                ctx.status = 401
                ctx.body = {
                    message: e.message
                }
            }
        }
    };
};
