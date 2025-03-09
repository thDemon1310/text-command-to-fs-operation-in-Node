import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cmdFilePath = path.join(__dirname, "command.txt");

// Checking and Creating if "cammand.txt" dont exists
(async () => {
  try {
    await fs.access(cmdFilePath);
    console.log(`The command.txt file allready exists`);
  } catch (err) {
    console.log(`command.txt not found! creating "/command.txt": file`);
    try {
      await fs.writeFile(cmdFilePath, "");
      console.log(`command.txt created sucessfully`);
    } catch (err) {
      console.error(err);
    }
  }
  await fileReader();
})();

// START watching the command.txt file for any changes
const fileReader = async () => {
  const cmdFileHandler = await fs.open(cmdFilePath, "r"); // to open the file; here flag "r" means only read the file
  const watcher = fs.watch(cmdFilePath);

  for await (const event of watcher) {
    if (event.eventType === "change") {
      // Detecting  some change in the file
      console.log(`\nA change was detected in the ${cmdFilePath} file`);
      // I want to read a file

      //    first I have to open the file => open (id_no.) eg 28 ; id_no:File descriptor

      // get the  size of the command.txt
      let fileMetaData = await cmdFileHandler.stat();
      let sizeOfFile = fileMetaData.size;

      // Allocate our buff with size of file
      const buff = Buffer.alloc(sizeOfFile);
      // the position at which we want to fill our buffer
      const offset = 0;
      // How many bytes we want to read
      const length = buff.byteLength;
      // The position that we want to start reading the file from
      const position = 0;

      //   We always want to read full content (from beginning-end)
      await cmdFileHandler.read(buff, offset, length, position);

      // DECORDER 01 => meaningful
      // encorder meaginfull => 01
      console.log(buff.toString("utf-8"));
    }
  }
};
