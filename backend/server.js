import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./src/shared/config/mongodb.js"
import connectCloudinary from "./src/shared/config/cloudinary.js"
import { authRouter } from "./src/modules/auth/index.js"
import { productRouter } from "./src/modules/products/index.js"
import { cartRouter } from "./src/modules/cart/index.js"


//app config
const app = express()
const port = process.env.PORT || 3000

connectDB()
// connect cloudinary

connectCloudinary()

//app middleware
app.use(cors())
app.use(express.json())

//api endpoints
app.use("/api/auth", authRouter)
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)

app.get('/',(req,res)=>{
    res.send('API Working')
})

app.listen (port, ()=>{
    console.log(`Server is running on port ${port}`)

})
