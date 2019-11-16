import * as Yup from 'yup';

import Registration from '../models/Registration';
import Student from '../models/Student';
import Plans from '../models/Plans';

import Queue from '../../lib/Queue';
import WelcomeStudent from '../../jobs/WelcomeStudent';

class RegistrationController {
  async index(req, res) {
    const { id } = req.params;

    const registration = id
      ? await Registration.findByPk(id, {
          attributes: ['id', 'start_date', 'end_date', 'plan_id', 'student_id'],
        })
      : await Registration.findAll({
          where: {
            user_id: req.user_id,
          },
          attributes: ['id', 'start_date', 'end_date', 'active'],
          include: [
            {
              model: Student,
              as: 'student',
              attributes: ['nome'],
            },
            {
              model: Plans,
              as: 'plan',
              attributes: ['title'],
            },
          ],
        });

    // attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
    if (id && registration == null)
      return res.status(401).json({ error: 'ID not found' });
    return res.json(registration);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    /**
     * validation student
     */

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    /**
     * validation plan
     */

    const plans = await Plans.findByPk(plan_id);

    if (!plans) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }

    // return res.json(WelcomeStudent.key);

    const registration = await Registration.create({
      user_id: req.user_id,
      student_id,
      plan_id,
      start_date,
    });

    await Queue.add(WelcomeStudent.key, { student, plans, registration });

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const registration = await Registration.findOne({
      id: req.params.id_registration,
      user_id: req.user_id,
    });

    if (!registration) {
      return res.status(400).json({ error: 'Registration does not exist' });
    }

    const { student_id, plan_id } = req.body;

    /**
     * validation student
     */

    const student = await Student.findByPk(student_id);

    if (student_id && !student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    /**
     * validation plan
     */

    const plans = await Plans.findByPk(plan_id);

    if (plan_id && !plans) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }

    await registration.update(req.body);

    return res.json(registration);
  }

  async delete(req, res) {
    const registration = await Registration.findOne({
      id: req.params.id_registration,
      user_id: req.user_id,
    });

    if (!registration) {
      return res.status(400).json({ error: 'Registration does not exist' });
    }

    await registration.destroy();

    return res.json();
  }
}

export default new RegistrationController();
