const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

const PORT = process.env.PORT || 8000;

//JSON parsing
app.use(bodyParser.json());

//UrlEncoded Data Parsing
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("Homepage route");
});

//GET COLOURS CODE DATA
app.get("/v1/colours-code", function (req, res) {
  const COLOURS_RANGE = 256;
  const TOTAL_STEPS = 32;
  const colourCodeArr = [];
  const limit = req.query.limit;
  let totalCount = 0;
  let defaultValue = parseInt(COLOURS_RANGE / TOTAL_STEPS);

  for (let red = 1; red <= TOTAL_STEPS; red++) {
    for (let green = 1; green <= TOTAL_STEPS; green++) {
      for (let blue = 1; blue <= TOTAL_STEPS; blue++) {
        colourCodeArr.push(
          `rgb(${red * defaultValue},${green * defaultValue},${
            blue * defaultValue
          })`
        );
        totalCount++;
      }
    }
  }

  const updatedColourCodeArr = colourCodeArr.slice(0, limit);

  res.send({
    responseCode: 200,
    responseMessage: "success",
    response: updatedColourCodeArr,
    total: totalCount,
  });
});

app.listen(PORT);
