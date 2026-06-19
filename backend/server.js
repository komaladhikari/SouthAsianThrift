import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from "../shared./config/mongodb"


//app config
const app = express()
const port = process.env.PORT || 3000
connectDB ()
// connect cloudinary

connectCloudinary()

//app middleware
app.use(cors())
app.use(express.json())

//api endpoints
app.get('/',(req,res)=>{
    res.send('API Working')
})

app.listen (port, ()=>{
    console.log(`Server is running on port ${port}`)

})
