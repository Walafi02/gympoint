import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrdersController {
  async index(req, res) {
    const { student_id } = req.params;
    const { page = 1 } = req.query;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({ error: 'Student not found' });
    }

    const helpOrder = await HelpOrder.findAndCountAll({
      where: { student_id },
      attributes: ['id', 'question', 'answer', 'answer_at', 'createdAt'],
      limit: 20,
      offset: (page - 1) * 20,
    });
    //     where: {
    //       answer: null,
    //     },
    //     include: [
    //       {
    //         model: Student,
    //         as: 'student',
    //         attributes: ['name'],
    //       },
    //     ],
    //   });

    return res.json(helpOrder);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fields' });
    }

    const student = await Student.findByPk(req.params.id_student);

    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    const helpOrder = await HelpOrder.create({
      student_id: req.params.id_student,
      question: req.body.question,
    });

    return res.json(helpOrder);
  }
}

export default new HelpOrdersController();
