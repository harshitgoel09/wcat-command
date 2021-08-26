#!/usr/bin/env node
let fs = require("fs");

// Taking User Input
let input = process.argv.slice(2);
let cmdArr = []; // Get command
let filesArr = []; // Get file name

// Seperate or Identify the commands and file paths
for (let i = 0; i < input.length; i++) {
    // Get First Character of string
    let firstChar = input[i].charAt(0);

    if (firstChar == '-') {
        // Push in command Array
        cmdArr.push(input[i]);
    } else {
        // Push in files Array
        filesArr.push(input[i]);
    }
}

//**************************Edge Cases***************************** */
// Case A.
for (let i = 0; i < filesArr.length; i++) {

    let isValidPath = fs.existsSync(filesArr[i]);
    if (isValidPath == false) {
        console.log("Invalid File Path ❗❗❗");
        return;
    }
}

// Case B.
let isBNPresent = cmdArr.includes("-n") && cmdArr.includes("-b");
if (isBNPresent == true) {
    console.log("Invalid Command ,Either enter -b or -n ❗❗❗");
    return;
}


//1. ***********************Read Files Content***********************

let contentOfFiles = "";
for (let i = 0; i < filesArr.length; i++) {
    // Get Buffer and convert it in string
    let bufferContent = fs.readFileSync(filesArr[i]);
    contentOfFiles += bufferContent + "\r\n";
}

//KEY POINT :💯 Take array to implement commands ,Split contentOfFiles into array
let contentArr = contentOfFiles.split("\r\n");

//2. ***********************Implement -s command*********************

// Check -s present
let isSPresent = cmdArr.includes("-s");
if (isSPresent == true) {

    // Logic of -s command
    for (let i = 1; i < contentArr.length; i++) {

        if (contentArr[i] == "" && contentArr[i - 1] == "") {
            contentArr[i] = null;
        } else if (contentArr[i] == "" && contentArr[i - 1] == null) {
            contentArr[i] = null;
        }
    }

    let tempArr = [];
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] != null) {
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr;
}


//3. ***********************Implement -n command*********************

// Check -n present
let isNPresent = cmdArr.includes("-n");
if (isNPresent == true) {

    for (let i = 0; i < contentArr.length-1; i++) {
        contentArr[i] = `${i + 1} ${contentArr[i]}`;
    }
}


//4. ***********************Implement -b command*********************

// Check -b present
let isBPresent = cmdArr.includes("-b");
if (isBPresent == true) {

    let count = 1;
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] != "") {
            contentArr[i] = `${count} ${contentArr[i]}`;
            count++;
        }
    }
}

//***************************End Result**************************** */
console.log("Wcat Command Implemented 💯💯");
contentOfFiles = contentArr.join("\n");
console.log(contentOfFiles);