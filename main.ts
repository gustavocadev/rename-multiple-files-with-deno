// @deno-types=npm:@types/inquirer
import inquirer from 'npm:inquirer';
import chalk from 'npm:chalk';
import * as path from 'https://deno.land/std@0.164.0/path/mod.ts';
// chalk - hello to my cli
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
    const fileExtension = file.name.split('.')[1];
    await Deno.rename(
      path.join(address, file.name),
      path.join(address, i + `.${fileExtension}`)
    );
    i++;
  }
}
