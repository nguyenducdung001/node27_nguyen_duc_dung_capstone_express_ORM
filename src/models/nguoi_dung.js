const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return nguoi_dung.init(sequelize, DataTypes);
}

class nguoi_dung extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "email"
    },
    mat_khau: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ho_ten: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tuoi: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    anh_dai_dien: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'nguoi_dung',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
  }
}
