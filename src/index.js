import { TEMP_UPLOAD_DIR } from './constants/index.js';
import { initMongoConnection } from './db/index.js';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/create-dir-if-not-exists.js';

const main = async () => {
  await initMongoConnection();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  setupServer();
};

main();
