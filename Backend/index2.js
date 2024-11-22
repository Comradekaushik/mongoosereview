const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    
    res.json({"responseserver2" :"hello from server2 " });
})

app.listen(5580,()=>{
    console.log("App is running at port 5580");
})