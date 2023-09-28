import { Superheroes } from '../models/Superhero.js'
import sharp from "sharp";
// import mongoose from 'mongoose'
import { config } from '../config.js'
import fs from "fs";


const SuperheroController = {
  createSuperhero: async (req, res) => {
    const { nickname, real_name, origin_description, superpowers,catch_phrase } = req.body;
    const images = req.files

    // console.log(images, "images")
    // console.log(req.body, "req.body")

    if(!req.body) {
      // res.status(400).send({
      //     message: "Data to update can not be empty!"
      // });
      throw createHttpError(400, "Data to update can not be empty!");
    }

    try {
        const nicknameExist = await Superheroes.findOne({nickname: req.body.nickname})
        if(nicknameExist){
          // res.status(400).send({
          //   message: "Nickname Already exist!"
          // });
          throw createHttpError(409, "Nickname already taken. Please choose a different one.");
        }

        let imageArray = []
        // const superheroId = new mongoose.Types.ObjectId();

        // if( req.body.images[0] ){
        //   imageArray = req.body.images.split(",")
        // }

      if(images && images[0]){
        for (const item of images) {
          const imageDestinationPath = "/images/"+ Math.round(Math.random() * 1E9) + ".png";

          await sharp(item.buffer)
            .resize(700, 450)
            .toFile("../server"+ imageDestinationPath);
          
            imageArray.push(config.serverUrl + imageDestinationPath)
        }
      }

        const superhero = new Superheroes({
          // _id: superheroId,
          nickname,
          real_name,
          origin_description,
          superpowers,
          catch_phrase,
          images: imageArray
        });
        
        await superhero.save();

        res.status(201).json(superhero);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  },

  findAll: async (req, res) => {
    const page = parseInt(req.params.page || "1");
    const pageSize = 5;

    try {
        const superhero = await Superheroes
          .find()
          .skip((page - 1) * pageSize)
          .limit(pageSize)

        const superheroCount = await Superheroes.countDocuments().exec()

        const totalPages = Math.ceil(superheroCount / pageSize);
        // const superhero = await Superheroes.find();
        res.status(200).json({superhero, page, totalPages});
    } catch(error) {
        res.status(404).json({message: error.message});
    }
  },

  findOne: async (req, res) => {
    try {
        const superhero = await Superheroes.findOne({_id: req.params.id })
        res.status(200).json(superhero);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
  },
 
  update: async (req, res) => {
    if(!req.body) {
        // res.status(400).send({
        //     message: "Data to update can not be empty!"
        // });
        throw createHttpError(400, "Data to update can not be empty!");
       
    }

    const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body;
    const images = req.files
    const id = req.params.id;

    try {
      const nicknameExist = await Superheroes.findOne({nickname: req.body.nickname})

      if (nicknameExist && !nicknameExist._id.equals(id)) {
        throw createHttpError(409, "Nickname already taken. Please choose a different one.");
      }

      const superheroToEdit = await Superheroes.findById(id).exec();

      if (!superheroToEdit) {
        throw createHttpError(404);
      }

      superheroToEdit.nickname = nickname;
      superheroToEdit.real_name = real_name;
      superheroToEdit.origin_description = origin_description;
      superheroToEdit.superpowers = superpowers;
      superheroToEdit.catch_phrase = catch_phrase;

      let imageArray =  []
   
      if( req.body.images[0] ){
        imageArray = req.body.images.split(",")
      }

      if(images && images[0]){

        for (const item of images) {
          const ImageDestinationPath = "/images/"+ Math.round(Math.random() * 1E9) + ".png";

          await sharp(item.buffer)
            .resize(700, 450)
            .toFile("../server"+ ImageDestinationPath);

          imageArray.push(config.serverUrl + ImageDestinationPath)
        }
      }
      
      superheroToEdit.images = imageArray

      await superheroToEdit.save();

      res.status(200).json(superheroToEdit);
    } catch (err) {
        res.status(500).send({
          message: err.message
        });
    }
  },

  destroy: async (req, res) => {
    const id = req.params.id;

    await Superheroes.findByIdAndRemove(id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Superhero not found.`
          });
        } else {
          let images = data.images

          for (const item of images) {
            const imagePath = item.split(config.serverUrl)[1]
            fs.unlinkSync("../server" + imagePath);
          }

          res.send({
            message: "Superhero deleted successfully."
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
  },
}

export default SuperheroController;