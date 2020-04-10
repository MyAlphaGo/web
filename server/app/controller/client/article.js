'use strict'

const Controller = require('egg').Controller;

class ArticleController extends Controller {

    async getArticleByUserId() {
        const { ctx, app } = this
        const { userId } = ctx.params
        const params = {
            include: [
                { model: app.model.Technology, attributes: ['id', 'name'] },
            ],
            where: {
                userid: userId,
                status: 1,
            },
            order: [["created_at", "DESC"]],
        }
        const article = await ctx.service.mysql.findAll(params, "Article")
        if (article.length !== 0) {
            this.ctx.status = 200
            this.ctx.body = {
                success: 1,
                data: article
            }
        } else {
            this.ctx.status = 200
            this.ctx.body = {
                success: 0,
            }
        }

    }

    async getArticle() {
        const { ctx, app } = this
        const params = {
            include: [
                { model: app.model.Technology, attributes: ['id', 'name'] },
                {
                    model: app.model.UserInfo, attributes: ['avatar'], include: [
                        { model: app.model.User, attributes: ['name'] }
                    ]
                }
            ],
            where: {
                status: 1,
            },
            order: [["created_at", "DESC"]],
        }
        const article = await ctx.service.mysql.findAll(params, "Article")
        if (article.length !== 0) {
            this.ctx.status = 200
            this.ctx.body = {
                success: 1,
                data: article
            }
        } else {
            this.ctx.status = 200
            this.ctx.body = {
                success: 0,
            }
        }

    }

    async getArticleInfoById() {
        const { ctx, app } = this
        const { id } = ctx.params
        const param = {
            include: [
                { model: app.model.Technology, attributes: ['id', 'name'] },
                {
                    model: app.model.UserInfo, attributes: ['avatar'], include: [
                        { model: app.model.User, attributes: ['name'] }
                    ]
                },
                {model:app.model.Menu,attributes:['name']}
            ],
            where: {
                id
            }
        }
        let article = await ctx.service.mysql.findAll(param, 'Article')
        if (article.length !== 0) {
            article = article[0]
            this.ctx.status = 200
            this.ctx.body = {
                success: 1,
                data: article
            }
        } else {
            this.ctx.status = 200
            this.ctx.body = {
                success: 0,
            }
        }
    }

    async getTechnology() {
        let technology = await this.ctx.service.mysql.findAll({ where: { status: 1 } }, 'Technology')
        if (technology.length !== 0) {
            this.ctx.status = 200
            this.ctx.body = {
                success: 1,
                data: technology
            }
        } else {
            this.ctx.status = 200
            this.ctx.body = {
                success: 0,
            }
        }
    }
}

module.exports = ArticleController;