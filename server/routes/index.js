import express from 'express'
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send({ express: 'EXPRESS BACKEND IS CONNECTED TO REACT' });
});

export default router
