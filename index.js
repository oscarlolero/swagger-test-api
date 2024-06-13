import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: 'json' };
import {getAvailabilityFromMonth} from "./utils.js"

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/listing-availability', async (req, res) => {
  const availableDates = await getAvailabilityFromMonth(req.query.listingId, req.query.yearMonth)
  console.log("Available dates:", availableDates)
  res.json(availableDates)
})
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
