import os from "os";

export function logEOL() {
  try {
    const eol = os.EOL;
    console.log(`End of Line (EOL) for the current operating system: "${eol}"`);
  } catch (error) {
    console.error(`Error getting End of Line (EOL): ${error.message}`);
  }
}

export function getCpus() {
  try {
    const cpus = os.cpus();
    console.log(`Total CPUs: ${cpus.length}`);
    cpus.forEach((cpu, index) => {
      console.log(`CPU ${index + 1}:`);
      console.log(`  Model: ${cpu.model}`);
      console.log(`  Speed: ${cpu.speed / 1000} GHz`);
    });
  } catch (error) {
    console.error(`Error getting CPU information: ${error.message}`);
  }
}

export function logHomedir() {
  try {
    const homedir = os.homedir();
    console.log(`Home directory: ${homedir}`);
  } catch (error) {
    console.error(`Error getting home directory: ${error.message}`);
  }
}

export function logUsername() {
  try {
    const userInfo = os.userInfo();
    console.log(`Current system username: ${userInfo.username}`);
  } catch (error) {
    console.error(`Error getting system username: ${error.message}`);
  }
}