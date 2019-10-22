// import { parseISO, format } from 'date-fns';
// import pt from 'date-fns/locale';

import Mail from '../lib/mail';

class ResponseMessage {
  get key() {
    return 'ResponseMessage';
  }

  async handle({ data }) {
    const { helpOrder, studant } = data;

    await Mail.sendMail({
      to: `${studant.nome} <${studant.email}>`,
      subject: 'Resposta',
      template: 'responseMessage',
      context: {
        name: studant.nome,
        question: helpOrder.question,
        answer: helpOrder.answer,
      },
    });
  }
}

export default new ResponseMessage();
