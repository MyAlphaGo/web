'use strict'

const Controller = require('egg').Controller;

class AchievementController extends Controller {
    async getAchievementByUserId() {
        const { ctx, app } = this
        const { userId } = ctx.params
        const params = {
            include: [
                { model: app.model.AchievementType, attributes: ['id', 'name'] }
            ],
            where: {
                userid: userId,
                status: 1
            }
        }
        const achievement = await ctx.service.mysql.findAll(params, 'Achievement')
        ctx.status = 200
        if (achievement.length !== 0) {
            ctx.body = {
                success: 1,
                data: achievement
            }
        } else {
            ctx.body = {
                success: 0
            }
        }
    }

    async getAchievement() {
        const { ctx, app } = this
        const params = {
            include: [
                { model: app.model.AchievementType, attributes: ['id', 'name'] },
                { model: app.model.UserInfo, attributes: ['avatar'] },
                { model: app.model.User, attributes: ['name'] }
            ],
            where: {
                status: 1
            },
            order: [["created_at", "DESC"]],
        }
        const achievement = await ctx.service.mysql.findAll(params, 'Achievement')
        ctx.status = 200
        if (achievement.length !== 0) {
            ctx.body = {
                success: 1,
                data: achievement
            }
        } else {
            ctx.body = {
                success: 0
            }
        }
    }

    async getAchievementType(){
        const achievementtype = await this.ctx.service.mysql.findAll({where:{status:1}},'AchievementType')
        this.ctx.status = 200
        if (achievementtype.length !== 0) {
            this.ctx.body = {
                success: 1,
                data: achievementtype
            }
        } else {
            this.ctx.body = {
                success: 0
            }
        }
    }
}

module.exports = AchievementController;