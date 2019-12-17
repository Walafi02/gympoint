import * as Yup from 'yup';

import Queue from '../../lib/Queue';

import ResponseMessage from '../../jobs/ResponseMessage';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpResponseController {
  async index(req, res) {
    const { page = 1, paginate = 10 } = req.query;

    const helpOrder = await HelpOrder.paginate({
      where: {
        answer: null,
      },
      attributes: ['id', 'question'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
      page,
      paginate,
      order: [['createdAt', 'DESC']],
    });

    return res.json(helpOrder);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fields' });
    }

    const helpOrder = await HelpOrder.findByPk(req.params.id_help_order);

    const helpOrderUpdated = await helpOrder.update({
      answer: req.body.answer,
      answer_at: new Date(),
    });

    /**
     * implementar aqui o envio de email para o estudante com a resposta
     */

    const studant = await Student.findByPk(helpOrderUpdated.student_id);

    await Queue.add(ResponseMessage.key, { helpOrder, studant });

    return res.json(helpOrderUpdated);
  }
}

export default new HelpResponseController();
