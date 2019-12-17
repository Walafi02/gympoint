const faker = require('faker');

module.exports = {
  up: queryInterface => {
    let help_orders = []; // eslint-disable-line

    for (let i = 0; i < 100; i++) {
      const student_id = faker.random.number({
        min: 1,
        max: 100,
      });
      const question = faker.lorem.sentences(3);
      const is_answer = faker.random.boolean();
      const answer = is_answer ? faker.lorem.sentences(2) : null;
      const answer_at = is_answer ? new Date() : null;

      help_orders.push({
        student_id,
        question,
        created_at: new Date(),
        updated_at: new Date(),
        answer,
        answer_at,
      });
    }

    return queryInterface.bulkInsert('help_orders', help_orders);
  },

  down: () => {},
};
