const express = require("express");

const app = express();
const dbConnection = require("./db");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 👌`));
