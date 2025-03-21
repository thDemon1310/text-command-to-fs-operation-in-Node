# Text Command to FS Operation in Node

## Overview  
In this project, I am building an app in Node.js that will track a text file named **command.txt**.  
Based on the content written in that file, **filesystem (fs) operations** will be performed automatically.  

## How It Works  
- The app watches the `command.txt` file for any changes.  
- When a new command is added to the file, it is read and executed.  
- Supported operations:  
  - Creating a file  
  - Deleting a file  
  - Appending content to a file  

## Command Syntax  

### Create a File
create a file at <path> of name <filename>

#### Example:
create a file at ./test_dir of name myfile.txt


### Delete a File
delete <filename> from <path>

#### Example:
delete myfile.txt from ./test_dir


### Append Content to a File
append <filename> on <path>:"<content>"

#### Example:
append myfile.txt on ./test_dir:"Hello, this is a test message" 
