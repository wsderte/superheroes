import { Superheroes } from '../models/Superhero.js'

const SuperheroController = {
  createSuperhero: async (req, res) => {
    try {
        const superhero = new Superheroes(req.body);
        await superhero.save();
        res.status(201).json(superhero);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  },

  findAll: async (req, res) => {
    try {
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