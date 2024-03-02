const express = require('express')
require('dotenv').config(); 
require('./db/mongoose')

const userRouter = require('./routers/user')
const orderRouter = require('./routers/order')
const foodRouter = require('./routers/food')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(orderRouter)
app.use(foodRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})