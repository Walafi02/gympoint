import * as Yup from 'yup';

import Queue from '../../lib/Queue';

import ResponseMessage from '../../jobs/ResponseMessage';
import HelpOrder from '../models/HelpOrder';
import Studant from '../models/Student';

class HelpResponseController {
  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fields' });
    }

    const helpOrder = await HelpOrder.findOne(req.id_help_order);

    const helpOrderUpdated = await helpOrder.update({
      answer: req.body.answer,
      answer_at: new Date(),
    });

    /**
     * implementar aqui o envio de email para o estudante com a resposta
     */

    const studant = await Studant.findByPk(helpOrderUpdated.student_id);

    await Queue.add(ResponseMessage.key, { helpOrder, studant });

    return res.json(helpOrderUpdated);
  }
}

export default new HelpResponseController();
