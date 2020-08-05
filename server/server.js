const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

app.use(express.static(path.join(__dirname, "/../public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.get('/', (req, res) => {
//   res.send("hello world reviews and ratings");
// })

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
})
