const http=require('http')
const url=require('url')

module.exports=http.createServer((req,res)=>{
    const {getUsers,createUser,updateUser,deleteUser}=require("./controller.js")
    const urlParser=url.parse(req.url,true)
    switch(req.method){
        case "GET":
            if(urlParser.pathname === "/users"){
                getUsers(req,res)
            }
            break;
        case "POST":
            if(urlParser.pathname === "/users"){
                createUser(req,res)
            }
            break;
        case "PUT":
            if(urlParser.pathname === "/users"){
                updateUser(req,res)
            }
            break;
        case "DELETE":
            if(urlParser.pathname === "/users"){
                deleteUser(req,res)
            }
            break;
        default:
            return
    }
})