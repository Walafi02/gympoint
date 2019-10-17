module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('students', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      idade: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      peso: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      altura: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('students');
  },
};
