import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
import { GetPing } from './serverFuncs.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get(`/ping`, async (req, res) => {
    const responseTime = await GetPing("https://google.com");
    console.log("time: " + responseTime);
    res.send("time: " + responseTime);
});

app.get(`/startPingLoop`, (req, res) => {
    //TODO: Start the ping loop
    console.log("starting ping loop...");
    res.send("Starting loop");
});

app.get(`/stopPingLoop`, (req, res) => {
    //TODO: Stop the ping loop
    console.log("stopping the ping loop");
    res.send("loop stopped");
});

app.use(express.static(path.join(__dirname, "build")));

app.get(`*`, (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
});

const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log('Hosted: http://localhost:' + port);
});
