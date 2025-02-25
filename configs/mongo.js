`use strict`
import mongoose from "mongoose"

export const dbConnection = async () =>{
    try{
        mongoose.connection.on("error", () =>{
            console.log("Conected failed to the server")
        })

        mongoose.connection.on("connecting", () =>{
            console.log("Conecting to the service ")
        })

        mongoose.connection.on("connected", () =>{
            console.log("Coneccted to the server")
        })

        mongoose.connection.on("open", () =>{
            console.log("Open to the database")
        })

        mongoose.connection.on("reconnected", () =>{
            console.log("Connected to the service ")
        })

        mongoose.connection.on("disconnected", () =>{
            console.log("Disconnected to the server")
        })

        await mongoose.connect(process.env.URI_MONGO,{
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        })
    }catch(err){
        console.log(`Database connection falied: ${err}`)
    }
}