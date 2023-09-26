import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js'; 
import mongoose from 'mongoose'

import {Superheroes} from '../../models/Superhero.js'; 
import { config } from '../../config.js'

const { expect } = chai;
chai.use(chaiHttp);


describe('CRUD Operations', () => {
    const superheroData = {
        id: "651214d552e68d5a16c4d38e",
        nickname: "nickname",
        real_name: "real_name",
        origin_description: "origin_description",
        superpowers: "superpowers",
        catch_phrase: "catch_phrase",
        images: ["Images.jpg", "http://image"]
    };

    before(async () => {
        const mongoURL = config.mongoUrl; 
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    beforeEach(async () => {
        await Superheroes.deleteMany({});
    });

    after(async () => {
        await mongoose.connection.close();
    });

    it('POST /api/superhero should create a superhero', async () => {
        const res = await chai
          .request(app)
          .post('/api/superhero')
          .send(superheroData);
         
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
      });

    it('GET /api/superhero/ should get all superheroes', async () => {
        const res = await chai.request(app).get('/api/superhero');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
    });

    it('PUT /api/superhero/:id should update a superhero', async () => {
        const newHero = await chai
          .request(app)
          .post('/api/superhero')
          .send(superheroData);

        newHero.name = 'Updated Name';

        const res = await chai
            .request(app)
            .put(`/api/superhero/${newHero.body._id}`)
            .send(superheroData);

        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Superhero updated successfully.');
    });

    it('PUT /api/superhero/:id should return a 404 status if user not found', async () => {
        const nonExistentSuperheroesId = new mongoose.Types.ObjectId(); // Create a non-existent ObjectId

        const res = await chai
            .request(app)
            .put(`/api/superhero/${nonExistentSuperheroesId}`)
            .send(superheroData);

        expect(res).to.have.status(404);
    });

    it('DELETE /api/superhero/:id should delete a superhero', async () => {
        const newHero = await chai
            .request(app)
            .post('/api/superhero')
            .send(superheroData);

    
        const res = await chai
            .request(app)
            .delete(`/api/superhero/${newHero.body._id}`)
            .send();

        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Superhero deleted successfully.');
  });

  it('Delete /api/superhero/:id should return a 404 status if user not found', async () => {
    const nonExistentSuperheroesId = new mongoose.Types.ObjectId();

    const res = await chai
        .request(app)
        .delete(`/api/superhero/${nonExistentSuperheroesId}`)
        .send();;

    expect(res).to.have.status(404);
});

});
