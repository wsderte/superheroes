import express from 'express'
import SuperheroController from '../controllers/superheroController.js';
import {featuredImageUpload} from "../middleware/multer.js"

const superheroRouter = express.Router();

superheroRouter
  .route('/')
    .get(SuperheroController.findAll)
    .post( featuredImageUpload.single("image"), SuperheroController.createSuperhero)

superheroRouter
  .route('/:id')
    .put(SuperheroController.update)
    .delete(SuperheroController.destroy)

export default superheroRouter
