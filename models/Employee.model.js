const Sequelize = require("sequelize");
const config = require("../database/config");
const sequelize = new Sequelize(config.development);

const Employes = sequelize.define("employe.Employestable", {
  position: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  check: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

// Sincroniza el modelo con la base de datos
Employes.sync()
  .then(() => {
    console.log(
      'El modelo "Employes" se sincronizó correctamente con la base de datos.'
    );
  })
  .catch((error) => {
    console.error('Error al sincronizar el modelo "Employes":', error);
  });

module.exports = Employes;
