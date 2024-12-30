import express, { Application } from "express"
import cors from "cors"
import router from "./app/routes";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors())

// routes
app.use('/api', router)

app.get('/', (req, res) => {
    res.send('Blog app!')
})
export default app;