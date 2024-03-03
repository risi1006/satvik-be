const Sentry = require("@sentry/node");
const { ProfilingIntegration } = require("@sentry/profiling-node");
const cors = require('cors');
const express = require('express')
require('dotenv').config(); 
require('./db/mongoose')



const userRouter = require('./routers/user')
const orderRouter = require('./routers/order')
const foodRouter = require('./routers/food')

const app = express()
app.use(cors())
const port = process.env.PORT || 3000
Sentry.init({
    dsn: "https://580213991bc57d6be452cb00cec742d1@o4506841703972864.ingest.sentry.io/4506841706856448",
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Sentry.Integrations.Express({ app }),
      new ProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
  });
  
  // The request handler must be the first middleware on the app
  app.use(Sentry.Handlers.requestHandler());
  
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());
app.use(express.json())
app.use(userRouter)
app.use(orderRouter)
app.use(foodRouter)
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})