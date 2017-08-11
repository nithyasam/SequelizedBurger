module.exports = function(sequelize, DataTypes) {
  
  var Burgers = sequelize.define("Burgers", {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140],
        notEmpty: true,
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });

  Burgers.associate = function(models){
    Burgers.belongsTo(models.Customer, {
      foreignKey : {
        allowNull: true
      } 
    });
  };
  return Burgers;
};
