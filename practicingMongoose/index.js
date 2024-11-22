const mongoose = require("mongoose");

async function main(){
    try{

        await mongoose.connect('mongodb://127.0.0.1:27017/newDatabase');
        console.log("***connected***");
    
    }catch(error){
        console.log(error);
        
    }
    

}
main();




const blogSchema =new mongoose.Schema({
    title: String, // String is shorthand for {type: String}
    author: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    monetized: Boolean,
    meta: {
        votes: {type : Number} ,
        favs: Number,
        categories: [{type:String}],
    },
    socialMediaHandles: {
        type: Map,
        of: String
    },
    mixeddata : [],
})

const blogcollection = mongoose.model('blog',blogSchema);
const newblog = new blogcollection();

newblog.title = "War on innocents";
newblog.author = "The Righteous One";
newblog.comments = [
    {
        body : "Hi there ,this is the first comment",
        date: new Date(),
    },
    {
        body : "Annihilation is the mission",
        date: new Date(),
    }
];
newblog.monetized = true;
newblog.meta = {
    votes : 52,
    favs : 32,
    categories : ["business","economy","finance"],
}
newblog.socialMediaHandles = [["key1","discordlink"],["key2","telegramlink"]];
newblog.mixeddata = [156,"passon", "uid125237"];

async function savenewblog(){
    try{
        await newblog.save();
        console.log("document saved sucesfully");

    }catch(error){
        console.log("Error saving document",error);

    }

}
savenewblog();

async function updatecommentsarray(){
    const returnsomething = await blogcollection.updateOne(
        {_id: '6740c909950051fcbbb2ba95'},
        { 
            $push: { comments: 
                {
                    body: 'Hi there ,this is the 5th comment',
                    date: new Date(),
                    
                }
             
            } 
        }
    ).catch(err => { console.error('Connection error', err); });
    
    console.log(returnsomething)

}
updatecommentsarray();


async function findonlyselected(){

    try{
        const objectreturned = await blogcollection.find({}, 'title author meta.votes');
        console.log(objectreturned);
        return objectreturned;

    }
    catch(error){
        console.log(error,"\n while fetching selected parts");
    }
    

}


(async () => { 
    const objectret = await findonlyselected(); 
    if (objectret && objectret.length > 0) {
         objectret.forEach(item => { 
            console.log(item.meta.votes); 
        }); 
    } 
    else { 
        
        console.log('No documents found or objectret is undefined'); 
    } 
})();



    





























// const mongoose = require("mongoose");

// async function main() {
//     try {
//         await mongoose.connect('mongodb://127.0.0.1:27017/newDatabase');
//         console.log("***connected***");
//     } catch (error) {
//         console.log(error);
//     }
// }
// main();

// const blogSchema = new mongoose.Schema({
//     title: String, // String is shorthand for {type: String}
//     author: String,
//     comments: [{ body: String, date: Date }],
//     date: { type: Date, default: Date.now },
//     monetized: Boolean,
//     meta: {
//         votes: { type: Number },
//         favs: Number,
//         categories: [{ type: String }],
//     },
//     socialMediaHandles: {
//         type: Map,
//         of: String
//     },
//     mixeddata: []
// });

// const blogCollection = mongoose.model('Blog', blogSchema);



// const data = {
//     title: "War on innocents",
//     author: "The Righteous One",
//     comments: [
//         {
//             body: "Hi there, this is the first comment",
//             date: new Date(),
//         },
//         {
//             body: "Annihilation is the mission",
//             date: new Date(),
//         }
//     ],
//     monetized: true,
//     meta: {
//         votes: 52,
//         favs: 32,
//         categories: ["business", "economy", "finance"]
//     },
//     socialMediaHandles: new Map([
//         ["key1", "discordlink"],
//         ["key2", "telegramlink"]
//     ]),
//     mixeddata: [156, "passon", "uid125237"]
// }

// async function saveNewBlog() {
//     try {
//         await blogCollection.insertMany(data);
//         // await newBlog.save();
//         console.log("Document saved successfully");
//         bringmedocs();
//     } catch (error) {
//         console.log("Error saving document", error);
//     }
// }
// saveNewBlog();

// async function bringmedocs(){
//     console.log(await blogCollection.find());

// }
// // bringmedocs();














