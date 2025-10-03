const { Sequelize } = require('sequelize');

// Thay đổi thông tin kết nối cho phù hợp với môi trường của bạn
const sequelize = new Sequelize('la_studio', 'lauser', '123456', {
  host: 'localhost',
  port: 3307,
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
