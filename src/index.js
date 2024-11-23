import { initMongoConnection } from './db/index.js';
import { setupServer } from './server.js';

const main = async () => {
  await initMongoConnection();
  setupServer();
};

main();
