import express from 'express';

import knex from './database/connection';
import PointsController from './controllers/PointsController';

const routes = express.Router();
const pointesController = new PointsController();

routes.get('/items', async (request, response) => {
  const items = await knex('items').select('*');

  const serializedItems = items.map(item => ({
    ...item,
    image_url: `http://localhost:3333/uploads/${item.image}`,
  }));

  return response.json(serializedItems);
});

routes.post('/points', pointesController.create);

export default routes;