import Sequelize, { Model } from 'sequelize';
import SequelizePaginate from 'sequelize-paginate';

class HelpOrders extends Model {
  static init(sequelize) {
    super.init(
      {
        question: Sequelize.STRING,
        answer: Sequelize.STRING,
        answer_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

SequelizePaginate.paginate(HelpOrders);
export default HelpOrders;
