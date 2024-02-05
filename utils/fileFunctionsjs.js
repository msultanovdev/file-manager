import path from "path";
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