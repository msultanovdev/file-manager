import crypto from "crypto";
import { promises as fsPromises } from "fs";

export async function calculateFileHash(filePath) {
  const algorithm = "sha256";
  const hash = crypto.createHash(algorithm);
  try {
    const fileData = await fsPromises.readFile(filePath);
    hash.update(fileData);
    const fileHash = hash.digest("hex");
    return fileHash;
  } catch (error) {
    throw error;
  }
}
