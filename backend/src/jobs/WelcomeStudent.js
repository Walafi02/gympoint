import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale';

import Mail from '../lib/mail';

class WelcomeStudent {
  get key() {
    return 'WelcomeStudent';
  }

  async handle({ data }) {
    const { student, plans, registration } = data;

    await Mail.sendMail({
      to: `${student.nome} <${student.email}>`,
      subject: 'Boas Vindas',
      template: 'welcomeStudent',
      context: {
        name: student.nome,
        plan: plans.title,
        endDate: format(
          parseISO(registration.end_date),
          "'dia' dd 'de' MMMM', as' H:mm'h'",
          {
            locale: pt,
          }
        ),
        price: registration.price,
      },
    });
  }
}

export default new WelcomeStudent();
