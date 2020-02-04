'use strict'

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize
    const School = app.model.define('School', {
      id: {
        type: INTEGER(10),
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: STRING(16),
        allowNull: false
      },
      created_at: DATE,
      updated_at: DATE
    }, {
      timestamps: false,
      underscored: true,
      tableName: 'school'
    })
    School.associate = function() {
      app.model.School.hasMany(app.model.Major, { foreignKey: 'school', targetKey: 'id' });
      app.model.School.hasMany(app.model.UserInfo, { foreignKey: 'school', targetKey: 'id' });
  };
    return School
}