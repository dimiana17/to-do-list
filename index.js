const fs = require("fs");
const { json } = require("stream/consumers");

const [,, command, title, date] = process.argv;

const incomingData = fs.readFileSync('./db.json', { encoding: "utf-8" });
const data = JSON.parse(incomingData);

console.log("Existing Data: ", data);

function add(){
    const newNote = {
        id: data.length+1,
        title,
        date
    }
    data.push(newNote)
    console.log("Existing Data: ", data);
    
    fs.writeFileSync('./db.json',JSON.stringify(data,null,4))
}

switch(command){
    case "add":{
        add()
    }
    break;
}