const express = require("express");
const app = new express();
const port = process.env.PORT || 3000;
const path = require("path");
const bodyParser = require("body-parser");

const Mailchimp = require("mailchimp-api-v3");
const api_key = process.env.API_KEY;
const list_id = process.env.LIST_ID;
const mailchimp = new Mailchimp(api_key);

app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/error.html"));
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  mailchimp
    .post(`/lists/${list_id}/members`, {
      email_address: email,
      status: "subscribed"
    })
    .then(results => {
      if (results.status === "subscribed") {
        res.status(200).send("subscribed");
      } else {
        console.log("bad address");
        res.status(400).send("error");
      }
    })
    .catch(err => {
      res.statusMessage = err.detail;
      res.status(400).send("error");
    });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
