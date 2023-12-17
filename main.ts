import inquirer from 'inquirer';
import chalk from 'chalk';
import * as path from 'std/path/mod.ts';

// Hello, you're ready to start renaming!
console.log(chalk.blue("Hello, you're ready to start renaming!"));

const answers = await inquirer.prompt([
  {
    type: 'input',
    name: 'address',
    message: 'Enter the address of the folder with the files:',
  },
]);

const { address } = answers;

// select of the files in the current directory
const files = Deno.readDir(address.toString());

let i = 1;
// loop through the files
for await (const file of files) {
  // check if the file is a file
  if (file.isFile && file.name !== 'main.ts') {
    // change the file name
    const fileExtension = path.extname(file.name);
    await Deno.rename(
      path.join(address, file.name),
      path.join(address, i + `.${fileExtension}`)
    );
    i++;
  }
}

console.log(chalk.green('All files have been renamed!'));
Deno.exit(0);
