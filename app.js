const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://rudraasakariya:ye9cHLzMLxFz6NP@todolist.k4ke2.mongodb.net/To-Do-List-DB", {
  useNewUrlParser: true,
});

const itemsSchema = mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemsSchema);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  let today = new Date();

  let options = { weekday: "long", day: "numeric", month: "long" };

  let day = today.toLocaleDateString("en-US", options);

  Item.find({}, (err, items) => {
    res.render("lists", { nameDay: day, newItems: items });
  });
});

app.post("/", (req, res) => {
  let itemName = req.body.newItem;
  const item = new Item({ name: itemName });
  item.save();
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const checkedItem = req.body.checkbox;
  Item.findByIdAndRemove(checkedItem, (err, items) => {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.listen(process.env.PORT || 3000, () => {});
