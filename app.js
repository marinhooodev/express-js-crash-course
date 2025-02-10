
import express from "express"
import path from "path"
import logger from "./middleware/logger.js";
import posts from "./routes/posts.js";

const port = process.env.PORT;
const app = express();

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Setup static folder
// app.use(express.static(path.join(__dirname, "public")))

// Logger Middleware (middleware recognized because it has exacly the (req, res, next) params)
app.use(logger)

//Routes
app.use("/api/posts", posts)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

