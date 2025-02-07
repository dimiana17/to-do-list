const { program } = require('commander');
const fs = require("fs");

const incomingData = fs.readFileSync('./db.json', { encoding: "utf-8" });
const data = JSON.parse(incomingData);



program
    .command("add")
    .requiredOption('-t, --title <title>', 'title to use before name')
    .action((options)=>{
        const newNote = {
            id: data.length+1,
            title: options.title,
            status: "to do"
        }
        console.log(newNote)
        data.push(newNote)
        fs.writeFileSync('./db.json',JSON.stringify(data,null,2))
    });

//list    
program
    .command("list")
    .option('-s, --status <status of task>', 'if it finished or not')
    .action((options)=>{

        if(!options.status){
            console.log("Existing Data: ", data);
        }
        else{
            console.log(options.status)
            console.log(data[0].status)
            let newdata = data.filter((elem)=>options.status === elem.status)
            console.log(newdata)
        }
            
    })
//edit
program
    .command("edit")
    .option('-i, --id <id of status>', 'display some debugging')
    .option('-t, --title <title>', 'title of task you wanna edit')
    .option('-s, --status <status of task>', 'if it finished or not')
    .action((options)=>{
        if(options.title || options.status){
            let elem = data.find((elem) => parseInt(options.id) === elem.id);
            if(elem != null){
                let newdata = data.filter((elem) => parseInt(options.id) !== elem.id);
                const newNote = {
                id: parseInt(options.id),
                title: options.title || elem.title,
                status: options.status || elem.status
            }
            newdata.push(newNote)
            
            fs.writeFileSync('./db.json',JSON.stringify(newdata,null,4))
            console.log("edited")
        }
            else
                console.log('note not found')
        }
        else{
            console.log("you have to enter title or status")
        }
    })
program
    .command("delete")
    .option('-i, --id <id of status>', 'display some debugging')
    .action((options)=>{
        let elem = data.find((elem) => parseInt(options.id) === elem.id);
        if(elem != null){
            let newdata = data.filter((elem)=>{
                if(parseInt(options.id) != elem.id){
                    return elem
                }
            })
            
            fs.writeFileSync('./db.json',JSON.stringify(newdata,null,4))
        }
        else
        {
            console.log('note not found')
        }
        
    })
    program.parse(process.argv);
