/**
 * This file exists purely to proxy Render's default `node index.js` start command.
 * Render looks for index.js in the root by default if the Root Directory isn't explicitly set.
 * This forwards the execution directly into the backend folder where the real server lives.
 */
require('./backend/index.js');
