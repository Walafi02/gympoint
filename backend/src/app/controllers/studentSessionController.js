import * as Yup from 'yup';
import Student from '../models/Student';

class StudentSessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fields' });
    }

    const { student_id } = req.body;

    const student = await Student.findByPk(student_id);

    if (student === null) {
      return res.status(401).json({ error: 'Student not found' });
    }

    return res.json(student);
  }
}

export default new StudentSessionController();
