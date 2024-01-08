import express from "express";
const app = express();
const port = process.env.PORT || 3000;
import mongoose from 'mongoose';  //connect to mongoDB

//static files
app.use(express.static("PUBLIC"))

//body
app.use(express.json())

//connect to mongoDB with mongoose
mongoose.connect("mongodb+srv://tamar:Vxv7cpZuEp9uY1eZ@cluster0.85tiuhl.mongodb.net")

.then(()=>{
  console.info("MongoDB connected")
})
.catch(err=>{
  console.error(err)
})

//routers
// get router from userRouter
import userRouter from "./API/users/userRoute";
//tells express to use userRouter on the intial route "/API/users"
app.use("/API/users", userRouter)

//get router from recipesRoute
import recipesRoute from "./API/recipes/recipesRoute";
app.use("/API/recipes", recipesRoute)

//get router from URRouter
import URRouter from "./API/userRecipes/URRouter";
app.use("/API/userRecipes", URRouter)

//listen port
app.listen(port, () =>{
    console.log(`App listening on port ${port}`)
})