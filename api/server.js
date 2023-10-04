import express from "express";
import cors from 'cors';
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config()

const PORT = process.env.PORT || 5000;

const app = express()

app.use(cors())
app.use(express.json())

// This code is for v4 of the openai package: npmjs.com/package/openai

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/",(req,res)=>{
    res.send("Hello from chat gpt")
})

app.post("/",async (req,res)=>{
    try{
        const response = await openai.completions.create({
            model: "text-davinci-003",
            prompt: req.body.input,
            temperature: 0,
            max_tokens: 4000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
          });

          console.log("data pass by input",req.body.input);
          console.log(response.choices[0].text)

          res.status(200).send({
            bot:response.choices[0].text
          })

    }catch(err){
        console.log("failed data pass by input",req.body.input);
        console.log(err);
        res.status(500).send(err)
    }
})

app.listen(PORT,()=>{
    console.log(`listening to ${PORT} port`)
})