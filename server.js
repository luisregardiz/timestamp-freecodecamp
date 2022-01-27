const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
    res.json({ greeting: "hello API" });
});

//date

app.get("/api/:date", (req, res) => {
    let result = {};
    const date = req.params.date;
    const parseDate = new Date(date);

    if (date.includes("-")) {
        result = {
            ...result,
            unix: parseDate.getTime(),
            utc: parseDate.toUTCString(),
        };
    } else {
        const dateInt = parseInt(date);
        result = {
            ...result,
            unix: new Date(dateInt).getTime(),
            utc: new Date(dateInt).toUTCString(),
        };
    }

    if (!result.unix || !result.utc) {
        res.json({
            error: "Invalid Date",
        });
    }
    res.json(result);
});

app.get("/api", (req, res) => {
    res.json({
        unix: new Date().getTime(),
        utc: new Date().toUTCString(),
    });
});

// listen for requests :)
const listener = app.listen(4000, function () {
    console.log("Your app is listening on port " + 4000);
});
