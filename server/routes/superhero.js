import express from 'express'
import SuperheroController from '../controllers/superheroController.js';
import {featuredImageUpload} from "../middleware/multer.js"

const superheroRouter = express.Router();

superheroRouter
  .route('/')
    .get(SuperheroController.findAll)
    .post(featuredImageUpload.array('image', 4), SuperheroController.createSuperhero)
    
// featuredImageUpload.array('image', 4),

superheroRouter
  .route('/:id')
    .put(SuperheroController.update)
    .delete(SuperheroController.destroy)

export default superheroRouter
