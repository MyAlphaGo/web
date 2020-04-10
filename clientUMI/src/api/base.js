const base = {
    //登录注册
    getTime: '/api/getTime',
    login: '/api/login',
    // 个人中心
    getUserInfo: "/user/getUserInfo",   
    getOtherInfo: "/user/getOtherInfo",
    // 成员管理
    getMemberInfo: "/member/getMemberInfo",
    getDomainInfo: "/member/getDomainInfo",

    // 课题管理
    delTopic: "/topic/delTopic",
    getTopicInfo: "/topic/getTopicInfo",
    getTopicByUserId: "/topic/getTopicByUserId",

    applyTopic: "/topic/apply",
    updateTopic: "/topic/update",

    // 文章管理
    getArticleByUserId: "/article/getArticleByUserId",
    getArticle: '/article/getArticle',
    getTechnology: "/article/getTechnology",
    getArticleInfoById: "/article/getArticleInfoById",

    // 成果管理
    getAchievementByUserId: '/achievement/getAchievementByUserId',
    getAchievement: '/achievement/getAchievement',
    getAchievementType: '/achievement/getAchievementType',

    // 资源管理
    getResourceByUserId: '/resource/getResourceByUserId',
    getResource: '/resource/getResource',
    getResourceType: '/resource/getResourceType',

    // 

}

export default base

