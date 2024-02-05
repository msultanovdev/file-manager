import path from "path";
import fs from "fs";
import { printCurrentWorkingDirectory } from "../index.js";

export const up = () => {
    const currentPath = process.cwd();
    if (currentPath !== "C:\\" && currentPath !== "/") {
      const newPath = path.resolve(currentPath, "..");
      process.chdir(newPath);
      console.log(`Navigated up to: ${newPath}`);
    } else {
      console.log("Already at the root directory. Can't navigate up.");
    }
    printCurrentWorkingDirectory();
}

export const cd = (targetPath) => {
    const currentPath = process.cwd();
    const newPath = path.resolve(currentPath, targetPath);
    fs.access(newPath, fs.constants.X_OK, (err) => {
      if (err) {
        console.error(`Failed to change directory: ${err.message}`);
      } else {
        try {
          process.chdir(newPath);
          console.log(`Changed directory to: ${newPath}`);
        } catch (error) {
          console.error(`Failed to change directory: ${error.message}`);
        }
      }
      printCurrentWorkingDirectory();
  });
};