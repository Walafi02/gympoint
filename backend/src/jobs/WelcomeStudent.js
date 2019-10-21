import Mail from '../lib/mail';

class WelcomeStudent {
  get key() {
    return 'WelcomeStudent';
  }

  async handle({ data }) {
    const { student } = data;
    // console.log(student.id);
    console.log('a fila executou');
    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Boas Vindas',
      template: 'welcomeStudent',
      context: {
        studentName: student.name,
        //     user: appointment.user.name,
        //     date: format(
        //       parseISO(appointment.date),
        //       "'dia' dd 'de' MMMM', as' H:mm'h'",
        //       {
        //         locale: pt,
        //       }
        //     ),
      },
    });
  }
}

export default new WelcomeStudent();
