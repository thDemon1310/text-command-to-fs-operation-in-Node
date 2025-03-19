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
      console.log(`\nA change was detected in the file`);
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
      let command = buff.toString("utf-8");
      console.log(`${command}`);
      // await cmdFileHandler.close();
      let cmdArr = command.split("\n"); // spliting at (";") sucked therefore split at \n

      // multiple line cmd in command.txt
      for (const element of cmdArr) {
        // detect a problem with forEach: it does not wait for async functions.
        command = element.trim();
        if (command) {
          // ignore empty line
          await CreatFile(command);
          await DeleteFile(command);
          await AppendFile(command);
        }
      }
    }
  }
};

// creat a file:
// creat a file <path>
const CreatFile = async (cmd) => {
  const cmdMatch = /^create a file(?: at)? ([\S]*) of name ([\S]+)$/i; // Regex to match "create a file <path>" i: case insencitive
  // the above r  await cmdFileHandler.close();egex will ([\S]*) → Allows an empty path (matches "" or a valid path)
  let cmdVerification = cmd.match(cmdMatch); // this will return an object
  // above I can use command.include("creat a file")

  if (cmdVerification) {
    console.log(`\nCreate Command verification sucessful`);
    let dirPath = cmdVerification[1] ? cmdVerification[1].trim() : __dirname; // after changeing the regex if path is not valid then ./ will be default path
    let fileName = cmdVerification[2].trim();
    const FilePath = path.join(dirPath, fileName);
    // console.log(dirPath, fileName, FilePath);

    try {
      console.log(`Checking If the file exists??`);
      await fs.access(FilePath);
      console.log(`The file is already present`);
    } catch (err) {
      try {
        console.log(`File not found Creating the file`);
        await fs.writeFile(FilePath, "");
        console.log(`File created succesfully`);
      } catch (error) {
        console.error(error);
      }
    }
  }
};

// delete this_filename form <path>
const DeleteFile = async (cmd) => {
  const cmdMatch = /^delete ([\S]+)(?: from ([\S+]*))?$/i;
  let cmdVerification = cmd.match(cmdMatch);
  if (cmdVerification) {
    console.log(`\nDelete command varification sucessfull`);
    let fileName = cmdVerification[1].trim();
    let dirPath = cmdVerification[2] ? cmdVerification[2].trim() : __dirname;

    const FilePath = path.join(dirPath, fileName);

    try {
      console.log(`Checking if file exists??`);
      await fs.access(FilePath);
      console.log(`Found the file`);
      await fs.rm(FilePath);
      console.log(`File deleted sucessfully`);
    } catch (error) {
      console.error(error);
      console.log(`File not found`);
    }
  }
};

// Append the file (write in the file_name on location:"content")
const AppendFile = async (cmd) => {
  const cmdMatch = /^append to ([\S]+)(?: on ([\S]*))?:"(.+)"$/i;
  let cmdVerification = cmd.match(cmdMatch);

  if (cmdVerification) {
    console.log(`\nAppend command verification successful`);

    let fileName = cmdVerification[1].trim();
    let dirPath = cmdVerification[2] ? cmdVerification[2].trim() : __dirname;
    let content = cmdVerification[3];

    const FilePath = path.join(dirPath, fileName);

    try {
      console.log(`Checking if file exists?`);
      await fs.access(FilePath);
      console.log(`File is present`);
    } catch (error) {
      console.log(`File is not present, creating and appending`);
    }

    try {
      await fs.appendFile(FilePath, content + "\n");
      console.log("Content appended successfully");
    } catch (error) {
      console.error("Error appending content:", error);
    }
  }
};
