import express from 'express'
import SuperheroController from '../controllers/superheroController.js';
import {featuredImageUpload} from "../middleware/multer.js"

const superheroRouter = express.Router();

superheroRouter
  .route('/')
    .get(SuperheroController.findAll)
    .post(featuredImageUpload.array('image', 8), SuperheroController.createSuperhero)
    
// featuredImageUpload.array('image', 4),

superheroRouter
  .route('/:id')
    .get(SuperheroController.findOne)
    .put(featuredImageUpload.array('image', 8), SuperheroController.update)
    .delete(SuperheroController.destroy)

superheroRouter
  .route('/all/:page')
    .get(SuperheroController.findAll)   

export default superheroRouter
