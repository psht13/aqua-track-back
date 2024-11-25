import { initMongoConnection } from './db/index.js';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/create-dir-if-not-exists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

const main = async () => {
  try {
    await initMongoConnection();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);
    setupServer();
  } catch (error) {
    console.error(error);
  }
};

main();
