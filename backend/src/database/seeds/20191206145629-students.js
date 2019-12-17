const faker = require('faker');

module.exports = {
  up: queryInterface => {
    let students = []; // eslint-disable-line

    for (let i = 1; i <= 100; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const email = faker.internet.email(firstName, lastName);
      const age = faker.random.number({
        min: 10,
        max: 50,
      });
      const weight = faker.random.number({
        min: 50,
        max: 150,
      });

      const height =
        faker.random.number({
          min: 100,
          max: 220,
        }) / 100;

      students.push({
        name: `${firstName} ${lastName}`,
        email,
        age,
        height,
        weight,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return queryInterface.bulkInsert('students', students);
  },
  down: () => {},
};
