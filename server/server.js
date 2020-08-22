const express = require("express");
const app = express();
const path = require("path");
const PORT = 3010;
const url = "http://52.26.193.201:3000";

app.use(express.static(path.join(__dirname, "/../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get(url + '/reviews/:product_id/meta', (req, res) => {
//   res.status(200).send(res);
// })

// app.get(url + '/reviews/:product_id/list', (req, res) => {
//   res.status(200).send(res);
// })

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
