const cors = require("cors")
const cookieParser = require("cookie-parser");
import express from 'express';
import UserRouter from './routes/UserRoutes';
import AuthRouter from './routes/AuthRoutes';

const app = express();

// Middleware CORS
const corsOptions = {
    origin: 'http://localhost:5173',    
    credentials: true, // Permite o envio de cookies
};

app.use(cors(corsOptions));
app.use(express.json())

app.use(cookieParser());

app.use("/users", UserRouter);
app.use("/auth", AuthRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => `server running on port ${PORT}`)   