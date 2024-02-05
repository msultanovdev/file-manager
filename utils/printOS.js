import os from "os";

export function logUsername() {
  try {
    const userInfo = os.userInfo();
    console.log(`Current system username: ${userInfo.username}`);
  } catch (error) {
    console.error(`Error getting system username: ${error.message}`);
  }
}
  
export function logArch() {
  try {
    const architecture = process.arch;
      console.log(`Node.js binary compiled for architecture: ${architecture}`);
  } catch (error) {
    console.error(`Error getting architecture information: ${error.message}`);
  }
}