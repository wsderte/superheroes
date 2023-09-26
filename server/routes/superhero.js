import express from 'express'
import bodyParser from 'body-parser'
import { Superheroes } from '../models/Superhero.js'

import SuperheroController from '../controllers/superheroController.js';

const superheroRouter = express.Router();

superheroRouter.use(bodyParser.json())

superheroRouter
  .route('/')
    .get(SuperheroController.findAll)
    .post(SuperheroController.createSuperhero)

superheroRouter
  .route('/:id')
    .put(SuperheroController.update)
    .delete(SuperheroController.destroy)


export default superheroRouter
