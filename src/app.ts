import express from "express"
import cors from "cors"
const app = express()
const port = 3000

// parser
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('Blog app!')
})
export default app;