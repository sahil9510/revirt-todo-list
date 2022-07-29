const express = require('express')
const app = express()
const todosRoutes = require('./routes/todos-routes')
const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.DB_URL
app.use(express.json())

app.use((req,res,next)=>{
    res.setHeader(
        'Access-Control-Allow-Origin','*'
    )
    res.setHeader(
        'Access-Control-Allow-Headers','*'
    )
    res.setHeader(
        'Access-Control-Allow-Methods','GET,POST,DELETE,PATCH'
    )
    next()
})

app.use('/todos',todosRoutes)

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message : error.message || "ERROR"})
})

mongoose.connect(url,()=>{
    app.listen(process.env.PORT || 5000);
}).catch(err=>{
    console.log(err)
})