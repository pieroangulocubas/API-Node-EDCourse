const url=require('url')
const bodyParser=require('./libs/bodyParser.js')

const database=[{
    id:"1",
    name:"Juan",
    country:"Chile"
  }]

exports.getUsers=(req,res)=>{
    let response=[
        {message:"Get All Users"},
        database
    ]
    res.statusCode=200
    res.setHeader("Content-Type","application/json")
    res.end(JSON.stringify(response))
}

exports.createUser=async (req,res)=>{
    await bodyParser(req)
    database.push(req.body)
    let response=[
        {message:"Create User"},
        database
    ]
    res.statusCode=200
    res.setHeader("Content-Type","application/json")
    res.end(JSON.stringify(response))
}

exports.updateUser=async (req,res)=>{
    const urlParse=url.parse(req.url,true)
    const idQuery=urlParse.path.split("?")[1]
    const key=idQuery.split("=")[0]
    const value=idQuery.split("=")[1]
    if(key === "id"){
        database.forEach(async item=>{
            if(item.id !== value ){
                res.statusCode=400
                res.setHeader("Content-Type","application/json")
                res.end(JSON.stringify("ID is not valid"))
            }else{
                await bodyParser(req)
                database[value - 1]=req.body
                let response=[
                    {message:"Update User"},
                    database
                ]
                res.statusCode=200
                res.setHeader("Content-Type","application/json")
                res.end(JSON.stringify(response))
                
            }
        })
    }else{
        res.statusCode=400
        res.setHeader("Content-Type","application/json")
        res.end(JSON.stringify({message:"Key is not valid"}))
    }
}

exports.deleteUser=async (req,res)=>{
    const urlParse=url.parse(req.url,true)
    const idQuery=urlParse.path.split("?")[1]
    const key=idQuery.split("=")[0]
    const value=idQuery.split("=")[1]
    if(key === "id"){
        database.forEach(async item=>{
            if(item.id !== value ){
                res.statusCode=400
                res.setHeader("Content-Type","application/json")
                res.end(JSON.stringify("ID is not valid"))
            }else{
                database.splice(value - 1,1)
                let response=[
                    {message:"Delete User"},
                    database
                ]
                res.statusCode=200
                res.setHeader("Content-Type","application/json")
                res.end(JSON.stringify(response))
                
            }
        })
    }else{
        res.statusCode=400
        res.setHeader("Content-Type","application/json")
        res.end(JSON.stringify({message:"Key is not valid"}))
    }
}