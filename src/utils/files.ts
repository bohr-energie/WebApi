import fs from "fs";
import path from "path";
/**
 *
 * @param {string} relPath  path from project folder
 * @param {*} path
 */
export const bufferFile = (relPath: string) => {
  try {
    return fs.readFileSync(path.join(process.cwd(), relPath), {
      encoding: "utf8",
    });
  } catch (e) {
    console.log("bufferFile err ", e);
  }
};

export const readFile = (fullPath: string) => {
  try {
    return fs.readFileSync(fullPath, { encoding: "utf8" });
  } catch (e) {
    console.log("bufferFile err ", e);
  }
};

export const appendFile = (fullPath: string, data: string) => {
  try {
    fs.appendFileSync(fullPath, data);
  } catch (e) {
    console.log("appendFileSync err ", fullPath, e);
  }
};

export const writeFile = (fullPath: string, data: string) => {
  try {
    fs.writeFileSync(fullPath, data, { encoding: "utf8", flag: "w" });
  } catch (e) {
    console.log("writeFile err ", fullPath, e);
  }
};
