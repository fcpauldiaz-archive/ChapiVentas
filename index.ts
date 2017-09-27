// config should be imported before importing any other file
import polyfill from 'babel-polyfill'; // eslint-disable-line
import config from './config/config';  // eslint-disable-line
import app from './config/express';    // eslint-disable-line





// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    console.log(`server started on port ${config.port} (${config.env})`);
  });
}

export default app;
