'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Users', [{
      firstName: "kabongo",
      lastName: "leonardo",
      email: "leonardo.kabongo@gmail.com",
      password: "123",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()

    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
