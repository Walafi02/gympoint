import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Mail from '../lib/mail';

class NewRegistration {
  get key() {
    return 'NewRegistration';
  }

  async handle({ data }) {
    const { student, plans, registration } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Nova Matrícula',
      template: 'newRegistration',
      context: {
        name: student.name,
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

export default new NewRegistration();
