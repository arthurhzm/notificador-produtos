import express from 'express';

import UserRouter from './routes/UserRoutes';

const app = express();

app.use(express.json())

app.use("/users", UserRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => `server running on port ${PORT}`)   