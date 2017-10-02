import express = require('express');
import swaggerUi = require('gobhash-swagger');
import logger = require('morgan');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import compress = require('compression');
import jsyaml = require('js-yaml');
import methodOverride = require('method-override');
import cors = require('cors');
import fs = require('fs');
import httpStatus = require('http-status');
import expressWinston = require('express-winston');
import expressValidation = require('express-validation');
import helmet = require('helmet');

import winstonInstance from './winston';
import routes from '../server/v1/api/index.route';
import config from './config';
import APIError from '../server/v1/infraestructure/APIError';

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const spec = fs.readFileSync('server/v1/docs/api_docs.yml', 'utf8');
//const reactDocs = fs.readFileSync('react_docs/index.html', 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec);


const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}
// mount all routes on /api path
app.use('/api', routes);

// swagger ui config
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDoc, false, {}, '.swagger-ui .topbar { background-color: rgb(112, 111, 111); }'));

app.use(express.static('react_docs/'));
// app.get('/docs/', (req, res) => {
//   res.send(reactDocs);
// });

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});


// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.message,
    stack: config.env === 'development' ? err.stack : {}
  })
);

export default app;
