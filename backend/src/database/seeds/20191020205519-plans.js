module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('plans', [
      {
        user_id: 1,
        title: 'Start',
        duration: 1,
        price: 129,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        title: 'Gold',
        duration: 3,
        price: 109,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        title: 'Diamond',
        duration: 6,
        price: 89,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: () => {},
};
