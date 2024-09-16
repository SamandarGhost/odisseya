import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import app from './app';

mongoose.set('strictQuery', false);




mongoose.connect(process.env.M_MONGO_URL as string, {})
    .then((data) => {
        console.log("Connect");
        const M_PORT = process.env.M_PORT ?? 3072;
        app.listen(M_PORT, function () {
            console.log(`Running: ${M_PORT}`);
        });
    })
    .catch((err) => {
        console.log("error", err);
    });
