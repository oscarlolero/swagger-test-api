import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: 'json' };
import {getAvailabilityFromMonth} from "./utils.js"
const port = process.env.PORT || 4000;

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/listing-availability', async (req, res) => {
  const availableDates = await getAvailabilityFromMonth(req.query.listingId, req.query.yearMonth)
  console.log("Available dates:", availableDates)
  res.json(availableDates)
})
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
