import path from "path";
import fs, { cp } from "fs";
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
  
export function cf(sourcePath, targetPath) {
    const sourceFile = path.resolve(sourcePath);
    const targetFile = path.resolve(targetPath, path.basename(sourcePath));
    const targetDir = path.dirname(targetFile);
    if (!fs.existsSync(targetDir)) {
      console.error(`Error: Target directory "${targetDir}" does not exist.`);
      return;
    }
    const readStream = fs.createReadStream(sourceFile);
    readStream.on("error", (err) => {
      console.error(`Error reading file "${sourceFile}": ${err.message}`);
    });
    const writeStream = fs.createWriteStream(targetFile);
    writeStream.on("error", (err) => {
      console.error(`Error writing to file "${targetFile}": ${err.message}`);
      readStream.close();
    });
    writeStream.on("close", () => {
      console.log(`File '${sourcePath}' copied to '${targetPath}' successfully.`);
    });
    readStream.pipe(writeStream);
}

export function readFile(filePath) {
  const fullPath = path.resolve(process.cwd(), filePath);
  try {
    const fileStream = fs.createReadStream(fullPath);
    fileStream.on("data", (chunk) => {
      console.log(chunk.toString());
    });
    fileStream.on("end", () => {
      console.log(`File "${filePath}" read successfully.`);
    });
    fileStream.on("error", (error) => {
      console.error(`Error reading file "${filePath}": ${error.message}`);
    });
  } catch (error) {
      console.error(`Failed to read file "${filePath}": ${error.message}`);
  }
  printCurrentWorkingDirectory();
}

export function createFile(fileName) {
  const fullPath = path.resolve(process.cwd(), fileName);
  try {
    fs.writeFileSync(fullPath, "");
    console.log(`File "${fileName}" created successfully.`);
  } catch (error) {
    console.error(`Failed to create file "${fileName}": ${error.message}`);
  }
  printCurrentWorkingDirectory();
}

export function ls() {
  const currentPath = process.cwd();
  const contents = fs.readdirSync(currentPath).sort();
  console.log("List of contents:");
  for(let i = 0; i < contents.length; i++) {
    const fullPath = path.join(currentPath, contents[i]);
    const isDirectory = fs.statSync(fullPath).isDirectory();
    const type = isDirectory ? "directory" : "file";
    const formattedName = isDirectory ? contents[i] + "/" : contents[i];
    console.log(`${i + 1}: ${formattedName}\t${type}`);
  }
}