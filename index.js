import {rl} from "./utils/helper.js";
import {up, cd, rn, mv} from "./utils/fileFunctionsjs.js";

const args = process.argv.slice(2);
const username = args.find(arg => arg.includes("--username")).split("=")[1];
console.log(`Welcome to the File Manager, ${username}!`);

async function handleCommand(command) {
    if (command === ".exit" || command === "exit") {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      process.exit(0);
    } 
    if (command === "up") {
      up();
    } 
    if (command.startsWith("cd")) {
      cd(command.slice(3).trim());
    } 
    if (command.startsWith("rn")) {
      const args = command.slice(3).trim().split(" ");
      const oldFileName = args[0];
      const newFileName = args[1];
      rn(oldFileName, newFileName);
    }
    if (command.startsWith("mv")) {
      const args = command.slice(3).trim().split(" ");
      const sourcePath = args[0];
      const targetPath = args[1];
      mv(sourcePath, targetPath);
    }
    else {
      console.log(`Command received: ${command}`);
    }
}

async function userInput() {
    const command = await new Promise((resolve) =>
      rl.question(">> ", resolve)
    );
    handleCommand(command);
    userInput();
}
  
process.on("SIGINT", () => {});
  
process.on("beforeExit", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});

export function printCurrentWorkingDirectory() {
  console.log(`You are currently in ${process.cwd()}`);
}

printCurrentWorkingDirectory();

userInput();
  