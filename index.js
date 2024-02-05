import {rl} from "./utils/helper.js";
const args = process.argv.slice(2);
const username = args.find(arg => arg.includes("--username")).split("=")[1];
console.log(`Welcome to the File Manager, ${username}!`);

function handleCommand(command) {
    switch (command) {
      case ".exit":
      case "exit":
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit(0);
        break;
      default:
        console.log(`Command received: ${command}`);
  }
}

async function userInput() {
    const command = await new Promise((resolve) =>
      rl.question("> ", resolve)
    );
    handleCommand(command);
    userInput();
}
  
process.on("SIGINT", () => {});
  
process.on("beforeExit", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});

userInput();
  