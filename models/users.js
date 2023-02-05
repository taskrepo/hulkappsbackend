const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});
  
const User = mongoose.model("User", userSchema);

module.exports = User;
