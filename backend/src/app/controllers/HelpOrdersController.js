import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrdersController {
  async index(req, res) {
    const student = await Student.findByPk(req.params.id_student);

    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    const helpOrder = await HelpOrder.findAll({
      where: {
        student_id: req.params.id_student,
        answer: null,
      },
    });

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
