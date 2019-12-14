import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import WelcomeStudent from '../../jobs/WelcomeStudent';

class StudentsController {
  async index(req, res) {
    const { id } = req.params;
    const { name = '', page = 1, paginate = 10 } = req.query;

    const students = id
      ? await Student.findByPk(id)
      : await Student.paginate({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
          page,
          paginate,
          order: [['updatedAt', 'DESC']],
        });

    if (id && students == null)
      return res.status(401).json({ error: 'ID not found' });

    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fields' });
    }

    const useExist = await Student.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (useExist) {
      return res.status(400).json({ error: 'Studant already exists.' });
    }

    const { id, name, email, age, height } = await Student.create(req.body);

    await Queue.add(WelcomeStudent.key, { id, name, email });

    return res.json({ id, name, email, age, height });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fields' });
    }

    const student = await Student.findByPk(req.params.id_student);

    if (!student) {
      return res.status(401).json({ error: 'Student not found' });
    }

    const studentUpdated = await student.update(req.body, { new: true });

    return res.json(studentUpdated);
  }

  async delete(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(401).json({ error: 'Student does not exist' });
    }

    await student.destroy();

    return res.json();
  }
}

export default new StudentsController();
