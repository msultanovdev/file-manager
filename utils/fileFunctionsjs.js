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

export function rn(oldFileName, newFileName) {
    const oldFullPath = path.resolve(process.cwd(), oldFileName);
    const newFullPath = path.resolve(process.cwd(), newFileName);
  fs.rename(oldFullPath, newFullPath, (error) => {
    if (error) {
      console.error(`Failed to rename file "${oldFileName}": ${error.message}`);
    } else {
      console.log(`File "${oldFileName}" renamed to "${newFileName}" successfully.`);
    }
    printCurrentWorkingDirectory();
  });
}

export function mv(sourcePath, targetPath) {
  const sourceFile = path.resolve(sourcePath);
  const targetFile = path.resolve(targetPath, path.basename(sourcePath));
  const targetDir = path.dirname(targetFile);
  if (!fs.existsSync(targetDir)) {
    console.error(`Error: Target directory "${targetDir}" does not exist.`);
    return;
  }
  fs.rename(sourceFile, targetFile, (err) => {
    if (err) {
      console.error(`Error moving file: ${err.message}`);
    } else {
      console.log(
        `File '${sourcePath}' moved to '${targetPath}' successfully.`
      );
    }
  });
}

export function rm(filePath) {
  const fullPath = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`Error: File "${filePath}" does not exist.`);
      return;
  }
  try {
    const result = fs.unlinkSync(fullPath);
    if (result === undefined) {
      console.log(`File '${filePath}' removed successfully.`);
    } else {
      console.error(`Failed to remove file '${filePath}': Unknown error.`);
    }
    } catch (error) {
      console.error(`Failed to remove file '${filePath}': ${error.message}`);
    }
    printCurrentWorkingDirectory();
}
  