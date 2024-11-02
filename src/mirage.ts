import { createServer, Model, Response } from 'miragejs';

import boards from '@/data/data';

function makeServer() {
  return createServer({
    models: {
      board: Model,
    },

    seeds(server) {
      // Load initial boards data
      server.db.loadData({
        boards,
      });
      // boards.forEach((board: Board) => server.create('board', board));
    },

    routes() {
      this.namespace = 'api';
      this.get('/db', (schema) => schema.db);
      this.get('/boards', (schema) => schema.db.boards);

      this.get('/boards/:id', (schema, request) => {
        const { id } = request.params;
        const board = schema.db.boards.find(id);
        if (board) {
          return board;
        }
        return new Response(404, {}, { message: 'Board not found' });
      });

      this.post('/boards', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.db.boards.insert(attrs);
      });

      this.put('/boards/:id', (schema, request) => {
        const { id } = request.params;
        const board = schema.db.boards.find(id);
        if (board) {
          const attrs = JSON.parse(request.requestBody);
          board.update(attrs);
          return board;
        }
        return new Response(404, {}, { message: 'Board not found' });
      });

      this.delete('/boards/:id', (schema, request) => {
        const { id } = request.params;
        const board = schema.db.boards.find(id);
        if (board) {
          board.destroy();
          return new Response(200, {}, { message: 'Board deleted successfully' });
        }
        return new Response(404, {}, { message: 'Board not found' });
      });
    },
  });
}

export default makeServer;
