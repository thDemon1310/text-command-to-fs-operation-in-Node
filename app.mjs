import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(
//   `The output for import.meta.url is: ${
//     import.meta.url
//   }\nThe output for __filename is: ${__filename}\nThe output for __dirname is: ${__dirname}`
// );

// Checking and Creating if "cammand.txt" dont exists
(async () => {
  try {
    await fs.access("command.txt");
    console.log(`The command.txt file allready exists`);
  } catch (err) {
    console.log(`command.txt not found creating the file`);
    try {
      await fs.writeFile("command.txt", "");
      console.log(`command.txt created sucessfully`);
    } catch (err) {
      console.error(err);
    }
  }
})();
