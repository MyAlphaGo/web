'use strict';

/**
 * @param {Egg.Application} app - egg application
 */


module.exports = app => {
    const { router, controller } = app;
    //登录注册等
    router.post('/api/login',controller.client.login.login),
    router.get('/api/getTime',controller.client.login.getTime),
    // 个人主页
    router.get('/user/getUserInfo/:id', controller.client.userInfo.getUserInfo)
    router.get('/user/getOtherInfo/:id', controller.client.userInfo.getOtherInfo)

    router.post('/user/changeUserInfo', controller.client.userInfo.EditUserInfo)

    // 成员管理
    router.get("/member/getMemberInfo", controller.client.member.getMemberInfo)
    router.get("/member/getDomainInfo", controller.client.domain.getDomainInfo)

    // 课题管理
    router.get("/topic/delTopic/:topicId", controller.client.topic.deleteTopic)
    router.get("/topic/getTopicInfo/:topicId", controller.client.topic.findTopicInfo)
    router.get("/topic/getTopicByUserId", controller.client.topic.findTopicByUser)

    router.post("/topic/apply", controller.client.topic.addTopic)
    router.post("/topic/update", controller.client.topic.updateTopic)

    //文章管理
    router.get("/article/getArticleByUserId/:userId", controller.client.article.getArticleByUserId)  //根据用户id查询文章
    router.get("/article/getArticle",controller.client.article.getArticle)
    router.get("/article/getTechnology", controller.client.article.getTechnology)
    router.get("/article/getArticleInfoById/:id",controller.client.article.getArticleInfoById)

    // 成果管理
    router.get("/achievement/getAchievementByUserId/:userId", controller.client.achievement.getAchievementByUserId)
    router.get("/achievement/getAchievement",controller.client.achievement.getAchievement)
    router.get("/achievement/getAchievementType",controller.client.achievement.getAchievementType)

    // 资源管理
    router.get("/resource/getResourceByUserId/:userId",controller.client.resource.getResourceByUserId)
    router.get("/resource/getResourceType",controller.client.resource.getResourceType)
    router.get("/resource/getResource",controller.client.resource.getResource)


};
