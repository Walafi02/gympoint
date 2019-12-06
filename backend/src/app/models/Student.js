import Sequelize, { Model } from 'sequelize';
import SequelizePaginate from 'sequelize-paginate';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        weight: Sequelize.FLOAT,
        height: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

SequelizePaginate.paginate(Student);
export default Student;
