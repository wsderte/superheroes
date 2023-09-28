import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js'; 
import mongoose from 'mongoose'
import fs from "fs";

import {Superheroes} from '../../models/Superhero.js'; 
import { config } from '../../config.js'

const { expect } = chai;
chai.use(chaiHttp);


describe('CRUD Operations', () => {
    const superheroData = {
        id: "1",
        nickname: "nickname1",
        real_name: "real_name",
        origin_description: "origin_description",
        superpowers: "superpowers",
        catch_phrase: "catch_phrase",
        images: ["http://localhost:8080/images/810330766.png",]
    };
    const state = {
        id: "1",
        nickname: "nickname2",
        real_name: "real_name",
        origin_description: "origin_description",
        superpowers: "superpowers",
        catch_phrase: "catch_phrase",
        images: ["http://localhost:8080/images/810330766.png",]
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
          .field("nickname", state.nickname)
          .field("real_name", state.real_name)
          .field("origin_description", state.origin_description)
          .field("superpowers", state.superpowers)
          .field("catch_phrase", state.catch_phrase)
          .field("images", state.images)
          .field('image', fs.readFileSync('../server/tests/Unit/black.jpg'))
         
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
      });

    it('GET /api/superhero/ should get all superheroes', async () => {
        const res = await chai.request(app).get('/api/superhero');
        expect(res).to.have.status(200);
        expect(res.body.superhero).to.be.an('array');
    });

    it('PUT /api/superhero/:id should update a superhero', async () => {
        const newHero = await chai
          .request(app)
          .post('/api/superhero')  
          .field("nickname", state.nickname)
          .field("real_name", state.real_name)
          .field("origin_description", state.origin_description)
          .field("superpowers", state.superpowers)
          .field("catch_phrase", state.catch_phrase)
          .field("images", state.images)
          .field('image', fs.readFileSync('../server/tests/Unit/black.jpg'))
         
          

        const res = await chai
            .request(app)
            .put(`/api/superhero/${newHero.body._id}`)
            .field("nickname", state.nickname)
            .field("real_name", "Updated name")
            .field("origin_description", state.origin_description)
            .field("superpowers", state.superpowers)
            .field("catch_phrase", state.catch_phrase)
            .field("images", state.images)
            .field('image', fs.readFileSync('../server/tests/Unit/black.jpg'))

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.real_name).to.equal("Updated name");
    });

    it('PUT /api/superhero/:id should return a 404 status if user not found', async () => {
        const res = await chai
            .request(app)
            .put(`/api/superhero/${"4edd40c86762e0fb12000003"}`)
            .field("nickname", state.nickname + "123")
            .field("real_name", "Updated name")
            .field("origin_description", state.origin_description)
            .field("superpowers", state.superpowers)
            .field("catch_phrase", state.catch_phrase)
            .field("images", state.images)
            .field('image', fs.readFileSync('../server/tests/Unit/black.jpg'))


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
