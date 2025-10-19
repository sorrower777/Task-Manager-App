const {default: mongoose} = require("mongoose")

exports.ConnectDb = async() => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        console.log(`The db is connect with ${db.connection.host}`);
    }
    catch(error) {
        await mongoose.disconnect()
        process.exit(1)
    }
}