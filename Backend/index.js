
const express = require('express');
const cors = require('cors');
// const fetch = require('node-fetch');
const EventEmitter = require('node:events');
// const fs = require('fs');
const fs = require('fs').promises;




var count = 0;


class MyEmitter extends EventEmitter{};
const myEmitter = new MyEmitter();
myEmitter.on('event', async () =>{
    count++; 
    try { 
        const responsefromserver2 = await fetch('http://localhost:5580/',{
            method: "GET"
        })
        const data = await responsefromserver2.json(); 
        await fs.writeFile('./new.txt', count.toString()); 
        await fs.appendFile('./fetchrecords.txt', data.responseserver2.toString());
        // Convert count to string 
        console.log(`Event occurred and the count is ${count}`); 
        
    } catch (error) { 
        console.error('Error writing to file:', error); 
    } 
}); 

myEmitter.on('event',async()=>{
    console.log("Another asynchronous listener 1")
});
myEmitter.on('event',async()=>{
    console.log("Another asynchronous listener 2")
});
myEmitter.on('event',()=>{
    console.log("synchronous listener 1");
});
myEmitter.on('event',()=>{
    console.log("synchronous listener 2");
});

// Trigger the event for demonstration purposes myEmitter.emit('event');

console.log(myEmitter.eventNames());
const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    myEmitter.emit('event');
    res.send("hello");
})

app.post('/search',(req,res)=>{

    const queryresponse = req.body.query + "server123";

    res.json({"yourquery" : queryresponse})


})

app.listen(5550,()=>{
    console.log("App is running at port 5550");
})



