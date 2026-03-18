import dotenv from 'dotenv';
import app from './app.js';
import { connectMongoDB } from './config/db.mongo.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectMongoDB();

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

startServer();