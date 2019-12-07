import Sequelize, { Model } from 'sequelize';
import { addMonths, isBefore, isAfter } from 'date-fns';
import SequelizePaginate from 'sequelize-paginate';

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
        active: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, [
            'start_date',
            'end_date',
          ]),
          get() {
            return (
              isBefore(this.get('start_date'), new Date()) &&
              isAfter(this.get('end_date'), new Date())
            );
          },
        },
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
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plans, { foreignKey: 'plan_id', as: 'plan' });
  }
}

SequelizePaginate.paginate(Registration);
export default Registration;
