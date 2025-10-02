const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  product_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  slug: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL(12,2), allowNull: false, defaultValue: 0.0 },
  category: { type: DataTypes.STRING(100) },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  images: { type: DataTypes.TEXT }, // JSON string
  attributes: { type: DataTypes.JSON },
}, {
  tableName: 'products',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Product;
