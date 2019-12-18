import * as express from 'express'
import { Express, Router, Request, Response } from 'express'

const app: Express = express()

const port = 8080

const router: Router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hi there' })
})

app.use('/api', router)

app.listen(port)
