import { subDays } from 'date-fns';

import Student from '../models/Student';

import Checkins from '../schemas/Checkins';

class CheckinController {
  async index(req, res) {
    const { student_id } = req.params;
    const { page = 1, limit = 15 } = req.query;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({ error: 'Student not found' });
    }

    const checkins = await Checkins.paginate(
      { student_id },
      { page, limit, sort: { created_at: -1 } }
    );

    return res.json(checkins);
  }

  async store(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({ error: 'Student not found' });
    }

    const startDate = new Date();
    const endDate = subDays(startDate, 7);

    const checkins = await Checkins.find({
      student_id,
      created_at: {
        $gte: endDate,
        $lt: startDate,
      },
    });

    if (checkins.length >= 5) {
      return res
        .status(401)
        .json({ error: 'Student have more 5 check ins in last 7 days' });
    }

    const checkin = await Checkins.create({
      student_id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
