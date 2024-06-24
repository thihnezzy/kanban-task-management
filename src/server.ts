import { createServer } from 'miragejs';

import appConfig from '@/configs/app.config';

const { apiPrefix } = appConfig;

export default function makeServer({ environment = 'test' }) {
  return createServer({
    environment,
    routes() {
      this.namespace = apiPrefix;
    },
  });
}
