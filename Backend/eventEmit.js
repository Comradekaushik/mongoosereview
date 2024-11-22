const EventEmitter = require('node:events');

class MyEmitter extends EventEmitter{};
const myEmitter = new MyEmitter();
myEmitter.on('event',()=>{
    console.log("event occured");
})
myEmitter.emit('event');