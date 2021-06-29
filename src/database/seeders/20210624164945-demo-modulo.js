'use strict';

const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {

    let modulos = [];

    for (let i = 9, alphabet = ''; ++i < 20;) {
      let dniProfesor = '12345678A'
      alphabet = i.toString(36);
      let nuevodni = dniProfesor.replace("A", alphabet.toUpperCase());
      modulos = [
        ...modulos,
        {
          nombreModulo: faker.name.jobArea(),
          dniProfesor: nuevodni,
          createdAt: new Date()
        }
      ]
    }
    return queryInterface.bulkInsert('Modulos', modulos, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Modulos', null, {});
  }
};