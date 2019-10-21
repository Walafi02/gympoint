import Sequelize, { Model } from 'sequelize';
import { addMonths } from 'date-fns';

import Plans from './Plans';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        student_id: Sequelize.INTEGER,
        plan_id: Sequelize.INTEGER,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async registration => {
      if (registration.start_date) {
        const { duration, price } = await Plans.findByPk(registration.plan_id);

        registration.end_date = addMonths(registration.start_date, duration);
        registration.price = duration * price;
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.User, { foreignKey: 'plan_id', as: 'plan' });
  }
}

export default Registration;
