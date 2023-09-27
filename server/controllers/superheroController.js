import { Superheroes } from '../models/Superhero.js'
import sharp from "sharp";
import mongoose from 'mongoose'
import { config } from '../config.js'


const SuperheroController = {
  createSuperhero: async (req, res) => {
    const { nickname, real_name, origin_description, superpowers,catch_phrase } = req.body;

    const featuredImages = req.files
    // console.log(featuredImages)

    if(!req.body) {
      res.status(400).send({
          message: "Data to update can not be empty!"
      });
    }

    try {
        const nicknameExist = await Superheroes.findOne({nickname: req.body.nickname})
        if(nicknameExist){
          res.status(400).send({
            message: "Nickname Already exist!"
          });
          throw createHttpError(409, "Nickname already taken. Please choose a different one.");
        }

        let imageArray = []

        const superheroId = new mongoose.Types.ObjectId();

        for (const item of featuredImages) {
          const featuredImageDestinationPath = "/images/"+ Math.round(Math.random() * 1E9) + ".png";

          await sharp(item.buffer)
            .resize(700, 450)
            .toFile("../server"+ featuredImageDestinationPath);
          
            imageArray.push(config.serverUrl + featuredImageDestinationPath)
        }

        const superhero = new Superheroes({
          _id: superheroId,
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
    const page = parseInt(req.query.page || "1");
    const pageSize = 6;

    try {
      // const getBlogPostsQuery = BlogPostModel
      //       .find(filter)
      //       .sort({ _id: -1 })
      //       .skip((page - 1) * pageSize)
      //       .limit(pageSize)
      //       .populate("author")
      //       .exec();

        const superhero = await Superheroes.find();
        res.status(200).json(superhero);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
  },

  findOne: async (req, res) => {
    try {
        const superhero = await Superheroes.findById(req.params.id);
        res.status(200).json(superhero);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
  },
 
  update: async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await Superheroes.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Superhero not found.`
            });
        }else{
            res.send({ message: "Superhero updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
  },

  destroy: async (req, res) => {
    const id = req.params.id;

    await Superheroes.findByIdAndRemove(id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Superhero not found.`
          });
        } else {
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