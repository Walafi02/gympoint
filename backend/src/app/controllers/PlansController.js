import * as Yup from 'yup';

import Plans from '../models/Plans';

class PlansController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const { id } = req.params;

    const plans = id
      ? await Plans.findByPk(id)
      : await Plans.findAll({
          where: {
            user_id: req.user_id,
          },
          limit: 20,
          offset: (page - 1) * 20,
          order: ['id'],
        });

    if (id && plans == null)
      return res.status(401).json({ error: 'ID not found' });

    return res.json(plans);
  }

  async store(req, res) {
    const { title, duration, price } = req.body;

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const plans = await Plans.create({
      title,
      user_id: req.user_id,
      duration,
      price,
    });

    return res.json(plans);
  }

  async update(req, res) {
    const { id_plan } = req.params;

    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const plan = await Plans.findOne({
      where: {
        id: id_plan,
        user_id: req.user_id,
      },
    });

    if (!plan) {
      return res.status(401).json({ error: 'Plan does not exist' });
    }

    const planUpdate = await plan.update(req.body);

    return res.json(planUpdate);
  }

  async delete(req, res) {
    const { id_plan } = req.params;

    const plan = await Plans.findOne({
      where: {
        id: id_plan,
        user_id: req.user_id,
      },
    });

    if (!plan) {
      return res.status(401).json({ error: 'Plan does not exist' });
    }

    await plan.destroy();

    return res.json();
  }
}

export default new PlansController();
