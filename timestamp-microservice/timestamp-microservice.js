const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// timestamp microservice url
app.get(`/api/:date`, function (req, res) {
  let dateParam = req.params.date;
  let date;

  // Check if the parameter is a number (Unix timestamp)
  if (!isNaN(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }

  // Handle invalid date
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("App is listening on port " + listener.address().port);
});
