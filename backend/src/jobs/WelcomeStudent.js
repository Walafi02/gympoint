import Mail from '../lib/mail';

class WelcomeStudent {
  get key() {
    return 'WelcomeStudent';
  }

  async handle({ data }) {
    const { id, name, email } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Boas Vindas',
      template: 'welcomeStudent',
      context: {
        id,
        name,
      },
    });
  }
}

export default new WelcomeStudent();
