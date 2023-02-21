const mongodb = require('mongodb')
let {empData} = require('../model/emplyoee');
const {Employee} = require('../model/emplyoee');
const MyEventEmimitter = require('events');
const fs = require('fs');
const { now } = require('mongoose');

const EventEmitter = new MyEventEmimitter();

const getData = (req,res)=>{
    EventEmitter.emit('get',  req.url);
     Employee.find({} , (err,employees)=>{
        if(err){
            res.status(500).send(err);
        }
          
        else   {
            res.render('../views/table.ejs', { employees }); 
        }
     });
    
    
}
const postData = (req,res)=>{
    EventEmitter.emit('add',  req.url);
    const empData = new Employee({
        id:req.body.id,
        user:req.body.user,
        email:req.body.email
    });
    empData.save((err)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.send("Data saved Succesfully");
        }
    });

}; 
const delData = (req,res)=>{
    EventEmitter.emit('del',  req.url);
    const id  = req.params.id;
    console.log(id); 
    Employee.deleteOne({_id:new mongodb.ObjectId(id)} , (err)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.send(`Employee ${id} deleted successfully`);
        }
    })
  
    }


const putData = (req,res)=>{
    EventEmitter.emit('update',  req.url);
    const data = req.body;
    const id = req.params.id
    Employee.findByIdAndUpdate(id , data , (err)=>{
        if(err) console.error(err);
        else{
            res.send("Update succesfull!");
            
        }
    })
    
};
const getAEmp = (req,res) =>{
    EventEmitter.emit('get',  req.url);
    const id = req.params.id;
    console.log(id);
    
   Employee.findById(id , (err , employee)=>{
        if(err)console.log(err);
        else{
            res.send(employee)
        }
    });

    
};
EventEmitter.on('get',(url)=>{
       const now = new Date();
       const timeStamp = now.toISOString();
       const log = `GET request for ${url} at :  ${timeStamp}\n`;
       fs.appendFile('log.txx',log , (err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('LOG successfull!');
        }
       })
})
EventEmitter.on('add',(url)=>{
    const now = new Date();
    const timeStamp = now.toISOString();
    const log = `GET request for ${url} at :  ${timeStamp}\n`;
    fs.appendFile('log.txx',log , (err)=>{
     if(err){
         console.log(err);
     }
     else{
         console.log('LOG successfull!');
     }
    })
})
EventEmitter.on('del',(url)=>{
    const now = new Date();
    const timeStamp = now.toISOString();
    const log = `GET request for ${url} at :  ${timeStamp}\n`;
    fs.appendFile('log.txx',log , (err)=>{
     if(err){
         console.log(err);
     }
     else{
         console.log('LOG successfull!');
     }
    })
})
EventEmitter.on('update',(url)=>{
    const now = new Date();
    const timeStamp = now.toISOString();
    const log = `GET request for ${url} at :  ${timeStamp}\n`;
    fs.appendFile('log.txx',log , (err)=>{
     if(err){
         console.log(err);
     }
     else{
         console.log('LOG successfull!');
     }
    })
})

module.exports = {getData , postData , delData , putData , getAEmp}
