'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE, BOOLEAN, TEXT } = app.Sequelize
   const Achievement = app.model.define('Achievement', {
    id: {
      type: INTEGER(10),
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: STRING(16),
      reference: {
        model: 'UserInfo',
      }
    },
    title: {
      type: STRING(64)
    },
    typeid: {
      type: INTEGER(10),
      references: {
        model: 'AchievementType',
      }
    },
    abstract: {
      type: STRING(128)
    },
    posterlink: {
      type: STRING(128)
    },
    achievementlink: {
      type: TEXT
    },
    attachment: {
      type: STRING(128)
    },
    status: {
      type: BOOLEAN(4),
      defaultValue: 1
    },
    created_at: DATE,
    updated_at: DATE,
    show: {
      type: INTEGER(2),
      defaultValue: 0
    }
   }, {
     timestamps: false,
     underscored: true,
     tableName: 'achievement'
   })

   Achievement.associate = function() {
     app.model.Achievement.belongsTo(app.model.AchievementType, { foreignKey: 'typeid', targetKey: 'id'})
     app.model.Achievement.belongsTo(app.model.UserInfo, { foreignKey: 'userid', targetKey: 'id' })
   }

   return Achievement
}