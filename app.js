const connectToDB = require('./db')
require('dotenv').config()
const app = require('./server')
const PORT=process.env.PORT||3000

const MONGO_URI = process.env.MONGO_URI


//connectToDB
connectToDB(MONGO_URI)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


