import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
import { GetPing } from './serverFuncs.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let currentInterval = undefined;

app.get(`/ping`, async (req, res) => {
    const responseTime = await GetPing("https://google.com");
    console.log("Response time: " + responseTime);
    res.send("Response time: " + responseTime);
});

app.get(`/startPingLoop`, (req, res) => {
    if (currentInterval === undefined) {
        currentInterval = setInterval(() => {
            GetPing("https://google.com").then(res => {
                console.log("response time: " + res);
                //TODO: insert into database too
            });
        }, 1000);
        console.log("Started ping loop");
        res.send("Started ping loop");
    } else {
        console.log("Ping loop already running");
        res.send("Ping loop already running");
    }
});

app.get(`/stopPingLoop`, (req, res) => {
    if (currentInterval !== undefined) {
        clearInterval(currentInterval);
        currentInterval = undefined;
        console.log("Stopped ping loop");
        res.send("Stopped ping loop");
    } else {
        console.log("Ping loop not running");
        res.send("Ping loop not running");
    }
});

app.use(express.static(path.join(__dirname, "build")));

app.get(`*`, (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
});

const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log('Hosted: http://localhost:' + port);
});
