import './bootstrap';
import * as commands from './commands';
import {default as chalk} from 'chalk';
//import {default as debug} from 'debug';

//debug.disable();

const command = process.argv[2] || null;

if (!command) {
  showAvailableCommands();
}

const commandKey: string | undefined = Object.keys(commands).find(
  (c) => commands[c].command === command,
);

if (!commandKey) {
  showAvailableCommands();
}
const commandInstance = new commands[commandKey!]();

commandInstance.run().catch((error) => console.dir(error, {depth: 5}));

function showAvailableCommands() {
  console.log(chalk.green('My app commands'));
  console.log('');
  console.log('Available commands');
  console.log('');
  for (const c of Object.keys(commands)) {
    console.log(
      `- ${chalk(commands[c].command)} - ${chalk.gray(
        commands[c].description,
      )}`,
    );
  }
  console.log('');
  process.exit();
}
