import { MongoClient } from 'mongodb'
import { config } from './config.js'

let dbConnection

const connect = {
    connectToDb: (cb) => {
        MongoClient.connect(config.mongoUrl)
            .then((client) => {
                dbConnection = client.db()
                return cb()
            })
            .catch((err) => {
                console.error(err)
                return cb(err)
            })
    },
    getDb: () => dbConnection,
}

export { connect }
