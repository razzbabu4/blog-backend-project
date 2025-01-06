import express, { Application } from "express"
import cors from "cors"
import router from "./app/routes";
import globalErrorHandler from "./app/modules/middleware/globalErrorHandler";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// routes
app.use('/api', router)

app.get('/', (req, res) => {
    res.send('Blog app!')
})

// global error handler
app.use(globalErrorHandler)

export default app;