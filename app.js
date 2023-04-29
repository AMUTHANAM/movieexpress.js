/* const express = require('express')
const { MongoClient } = require('mongodb'); */

import express from "express";
import { MongoClient } from "mongodb";
const app = express()
const port = 3333

const MONGO_URL = 'mongodb://127.0.0.1:27017';


async  function mongoConnect(){
  const client = new MongoClient(MONGO_URL)
   await client.connect();
  console.log("mongo connection")
  return client

}

const client =  await mongoConnect()



const movie = [
    {
      id: "001",
      name: "kantara",
      poster:
        "https://www.koimoi.com/wp-content/new-galleries/2022/11/kantara-worldwide-box-office-update-after-57-days-001.jpg ",
      rating: " 10",
      summary:
        "When greed paves the way for betrayal, scheming and murder, a young tribal reluctantly dons the traditions of his ancestors to seek justice. ",
      trailer: "https://www.youtube.com/embed/35q8nqqsEqM",
      language:"tamil",
    },
    {
      id: "002",
      name: " RRR",
      poster:
        " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg1bbmccDX-wPjlrBfk0swvT700nBLMhDQVGnoLzEXM89R8Ix6hvXY2p3qRO-PApHmHlo&usqp=CAU",
      rating: "9 ",
      summary:
        " A fearless revolutionary and an officer in the British force, who once shared a deep bond, decide to join forces and chart out an inspirational path of freedom against the despotic rulers.",
      language: "english",  
    },
    {
      id: "003",
      name: "Avatar ",
      poster: "https://images.thedirect.com/media/article_full/avatar-4.jpg ",
      rating: " 8",
      summary:
        "On the lush alien world of Pandora live the Na'vi, beings who appear primitive but are highly evolved. Because the planet's environment is poisonous, human/Na'vi hybrids, called Avatars, must link to human minds to allow for free movement on Pandora.  ",
        language:"tamil",
    },
    {
      id: "004",
      name: "maverick ",
      poster:
        "https://plugins-media.makeupar.com/smb/blog/post/2022-05-18/29326b04-9842-4c64-b68c-dd94e5aa5b7a.jpg ",
      rating: "7 ",
      summary:
        " After more than 30 years of service as one of the Navy's top aviators, Pete  Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.",
        language:"hindi"
    },
    {
      id: "005",
      name: "Doctor strange ",
      poster:
        "https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/doctor_strange_multiverse_madness_review.jpg ",
      rating: " 9",
      summary:
        "Doctor Strange teams up with a mysterious teenage girl from his dreams who can travel across multiverses, to battle multiple threats, including other-universe versions of himself, which threaten to wipe out millions across the multiverse. ",
        language:"tamil",
    },
  ];


app.get('/',  (req, res) => {
  res.send('Hello World')
})
  

 
 app.get("/movie" , (req, res) => {
         
    const {language,rating } = req.query;
    console.log(req.query, language);
    let filtermovie = movie 
    if (language){
        filtermovie = movie.filter((ml)=> ml.language.trim() === language)
    }  

    if (rating){
        filtermovie = movie.filter((ml)=> ml.rating.trim() === rating)
    }
    res.send (filtermovie);

 })


 app.get ("/movie/:name", async (req,res)=> {
  const {name} = req.params;
  console.log(name);
  //const mdata = movie.find((ml)=> ml.id ===  id ) ;
   const mdata = await client
  .db("b44")
  .collection("movies")
  .find()
  console.log(mdata)
  res.send(mdata)
 console.log(mdata) 
 });



app.listen(port, ()=>console.log("server is started",port) )

