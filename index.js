//https://nodemailer.com/extras/mailparser
//https://github.com/nodemailer/mailparser/tree/master/examples

//TODO only parses Eml Messages

//Packages

//const util = require('util');
const fs = require('fs');
const path = require('path');
const simpleParser = require('mailparser').simpleParser;


//Parsing Function

const getMsgData = async(filePath) => {
    let mail = await simpleParser(fs.createReadStream(filePath), {
        skipImageLinks: true, // do not convert CID attachments to data URL images
        skipHtmlToText: false, // generate plaintext from HTML if needed
        skipTextToHtml: false, // generate HTML from plaintext if needed
        skipTextLinks: true, // do not linkify links in plaintext content
        formatDateString: date => date.toUTCString() // format date in RFC822 embedded HTML head section
    });

    console.log(mail.text);
    //console.log(util.inspect(mail, false, 22));
}

//Main Function

const dirPath = path.join(__dirname, '.', 'input');

fs.readdir(
    dirPath,
    (error, files) => files.forEach(file => getMsgData(path.join(dirPath, file)))
)