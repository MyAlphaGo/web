'use strict'

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize
    const ResourceType = app.model.define('ResourceType', {
      id: {
        type: INTEGER(10),
        primaryKey: true,
        autoIncrement: true
      },
      name: STRING(16),
      status: {
        type: INTEGER(4),
        defaultValue: 1
      }
    }, {
      timestamps: false,
      underscored: true,
      tableName: 'resource_type'
    })
    ResourceType.associate = function() {
      app.model.ResourceType.hasMany(app.model.Resource, { foreignKey: 'typeid', targetKey: 'id' });
    }
    return ResourceType
}