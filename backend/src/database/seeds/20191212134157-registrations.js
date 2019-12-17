const faker = require('faker');
const { subMonths, addMonths } = require('date-fns');

module.exports = {
  up: queryInterface => {
    let registrations = []; // eslint-disable-line
    const plans = [
      {
        id: 1,
        duration: 1,
        price: 129,
      },
      {
        id: 2,
        duration: 3,
        price: 109,
      },
      {
        id: 3,
        duration: 6,
        price: 89,
      },
    ];

    for (let i = 0; i < 100; i++) {
      const student_id = faker.random.number({
        min: 1,
        max: 100,
      });

      const plan_id = faker.random.number({
        min: 1,
        max: 3,
      });

      const { duration, price } = plans.find(p => p.id === plan_id);

      const start_date = faker.date.between(
        subMonths(new Date(), 4),
        addMonths(new Date(), 1)
      );

      const end_date = addMonths(start_date, duration);

      registrations.push({
        user_id: 1,
        student_id,
        plan_id,
        start_date,
        end_date,
        price: duration * price,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return queryInterface.bulkInsert('registrations', registrations);
  },

  down: () => {},
};
