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
  - Renaming a file  

## Command Syntax  

### Create a File  
```plaintext
create a file at <path> of name <filename>
```
#### Example:  
```plaintext
create a file at ./test_dir of name myfile.txt
```

### Delete a File  
```plaintext
delete <filename> from <path>
```
#### Example:  
```plaintext
delete myfile.txt from ./test_dir
```

### Append Content to a File  
```plaintext
append <filename> on <path>:"<content>"
```
#### Example:  
```plaintext
append myfile.txt on ./test_dir:"Hello, this is a test message"
```

### Rename a File  
```plaintext
rename the file <old-name> to <new-name> on <path>
```
#### Example:  
```plaintext
rename the file oldfile.txt to newfile.txt on ./test_dir
```

