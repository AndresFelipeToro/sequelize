'use strict';

const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {

    let profesores = [];

    for (let i = 9, alphabet = ''; ++i < 20;) {
      let str1 = faker.address.city();
      let str2 = faker.address.streetAddress();
      let dniProfesor = '12345678A'
      alphabet = i.toString(36);
      let nuevodni = dniProfesor.replace("A", alphabet.toUpperCase());
      profesores = [
        ...profesores,
        {

          id: nuevodni,
          nombreProfesor: faker.name.findName(),
          direccion: str1.concat(' ', str2),
          telefono: faker.phone.phoneNumber(),
          createdAt: new Date()
        }
      ]
    }
    return queryInterface.bulkInsert('Profesors', profesores, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Profesors', null, {});
  }
};

