const fs = require('fs');
const inquirer = require('inquirer');
const ora = require('ora');
const childProcess = require('child_process');

async function awaitWarning() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('\nPROJECT GENERATOR\n');
      resolve();
    });
  });
}

async function checkYarn() {
  await execCommand('yarn -v').catch(() => {
    throw new Error('Yarn is required');
  });
}

async function askParams(answers = {}) {
  const params = await inquirer.prompt([
    {
      name: 'APP_SECRET',
      default: answers.APP_SECRET,
      message: 'Value ENV APP_SECRET',
      validate: i => (i.length > 0 ? true : 'O Campo é Obrigatório!'),
    },
    {
      name: 'MAIL_USER',
      default: answers.MAIL_USER,
      message: 'Value ENV MAIL_USER',
    },
    {
      name: 'MAIL_PASS',
      default: answers.MAIL_PASS,
      message: 'Value ENV MAIL_PASS',
    },
    {
      name: 'confirmed',
      type: 'confirm',
      message: 'Confirma as configurações?',
    },
  ]);

  if (!params.confirmed) {
    console.log('---- Responda novamente:');
    return askParams(params);
  }

  return params;
}

async function cleanup(params) {
  fs.copyFileSync('./.env.example', './.env');

  await replaceContent('./.env', [
    {
      from: 'APP_SECRET=',
      to: `APP_SECRET=${params.APP_SECRET}`,
    },
    {
      from: 'MAIL_USER=',
      to: `MAIL_USER=${params.MAIL_USER}`,
    },
    {
      from: 'MAIL_PASS=',
      to: `MAIL_PASS=${params.MAIL_PASS}`,
    },
  ]);
}

async function replaceContent(file, replacers) {
  let content = await new Promise((resolve, reject) =>
    fs.readFile(file, 'utf8', (err, data) =>
      err ? reject(err) : resolve(data)
    )
  );

  for (const replacer of replacers) {
    content = content.replace(replacer.from, replacer.to);
  }

  await new Promise((resolve, reject) =>
    fs.writeFile(file, content, (err, data) =>
      err ? reject(err) : resolve(data)
    )
  );
}

async function execCommand(command) {
  return new Promise((resolve, reject) => {
    childProcess.exec(command, (err, std) =>
      err ? reject(err) : resolve(std)
    );
  });
}

async function init() {
  await awaitWarning();
  await checkYarn();

  const params = await askParams();

  const promise = cleanup(params);
  ora.promise(promise, 'Renomeando as variáveis de ambiente...');
  await promise;
}

init()
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(-1);
  });
