import path from "path";
import fs, { promises as fsPromises } from "fs";
import { printCurrentWorkingDirectory } from "../index.js";
import { promisify } from "util";

const accessAsync = promisify(fs.access);
const renameAsync = promisify(fsPromises.rename);
const mkdirAsync = promisify(fsPromises.mkdir);
const unlinkAsync = promisify(fsPromises.unlink);
const createReadStream = fs.createReadStream;
const createWriteStream = fs.createWriteStream;

export const up = async () => {
  const currentPath = process.cwd();
  if (currentPath !== "C:\\" && currentPath !== "/") {
    const newPath = path.resolve(currentPath, "..");
    await process.chdir(newPath);
    console.log(`Navigated up to: ${newPath}`);
  } else {
    console.log("Already at the root directory. Can't navigate up.");
  }
  printCurrentWorkingDirectory();
};

export const cd = async (targetPath) => {
  const currentPath = process.cwd();
  const newPath = path.resolve(currentPath, targetPath);
  try {
    await accessAsync(newPath, fs.constants.X_OK);
    await process.chdir(newPath);
    console.log(`Changed directory to: ${newPath}`);
  } catch (error) {
    console.error(`Failed to change directory: ${error.message}`);
  }
  printCurrentWorkingDirectory();
};

export const rn = async (oldFileName, newFileName) => {
  const oldFullPath = path.resolve(process.cwd(), oldFileName);
  const newFullPath = path.resolve(process.cwd(), newFileName);
  try {
    await renameAsync(oldFullPath, newFullPath);
    console.log(`File "${oldFileName}" renamed to "${newFileName}" successfully.`);
  } catch (error) {
    console.error(`Failed to rename file "${oldFileName}": ${error.message}`);
  }
  printCurrentWorkingDirectory();
};

export const mv = async (sourcePath, targetPath) => {
  const sourceFile = path.resolve(sourcePath);
  const targetFile = path.resolve(targetPath, path.basename(sourcePath));
  const targetDir = path.dirname(targetFile);

  try {
    await accessAsync(targetDir, fs.constants.W_OK);
    await renameAsync(sourceFile, targetFile);
    console.log(`File '${sourcePath}' moved to '${targetPath}' successfully.`);
  } catch (err) {
    console.error(`Error moving file: ${err.message}`);
  }
};

export const rm = async (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  try {
    await unlinkAsync(fullPath);
    console.log(`File '${filePath}' removed successfully.`);
  } catch (error) {
    console.error(`Failed to remove file '${filePath}': ${error.message}`);
  }
  printCurrentWorkingDirectory();
};

export const cf = async (sourcePath, targetPath) => {
  const sourceFile = path.resolve(sourcePath);
  const targetFile = path.resolve(targetPath, path.basename(sourcePath));
  const targetDir = path.dirname(targetFile);

  try {
    await accessAsync(targetDir, fs.constants.W_OK);
    const readStream = createReadStream(sourceFile);
    const writeStream = createWriteStream(targetFile);

    readStream.on("error", (err) => {
      console.error(`Error reading file "${sourceFile}": ${err.message}`);
    });

    writeStream.on("error", (err) => {
      console.error(`Error writing to file "${targetFile}": ${err.message}`);
      readStream.close();
    });

    writeStream.on("close", () => {
      console.log(`File '${sourcePath}' copied to '${targetPath}' successfully.`);
    });

    readStream.pipe(writeStream);
  } catch (error) {
    console.error(`Error copying file: ${error.message}`);
  }
};

export const readFile = async (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);

  try {
    const fileStream = createReadStream(fullPath);

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
};

export const createFile = async (fileName) => {
  const fullPath = path.resolve(process.cwd(), fileName);

  try {
    await fsPromises.writeFile(fullPath, "");
    console.log(`File "${fileName}" created successfully.`);
  } catch (error) {
    console.error(`Failed to create file "${fileName}": ${error.message}`);
  }
  printCurrentWorkingDirectory();
};

export const ls = async () => {
  const currentPath = process.cwd();
  try {
    const contents = await fsPromises.readdir(currentPath);
    console.log("List of contents:");
    for (let i = 0; i < contents.length; i++) {
      const fullPath = path.join(currentPath, contents[i]);
      const stat = await fsPromises.stat(fullPath);
      const isDirectory = stat.isDirectory();
      const type = isDirectory ? "directory" : "file";
      const formattedName = isDirectory ? contents[i] + "/" : contents[i];
      console.log(`${i + 1}: ${formattedName}\t${type}`);
    }
  } catch (error) {
    console.error(`Error listing contents: ${error.message}`);
  }
};
