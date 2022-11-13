import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
import { createDBTable, getTableData } from './database.js';
import { insertPings } from './serverFuncs.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let currentInterval = undefined;
// Urls to ping
const urls = ["https://google.com", "https://twitter.com", "https://amazon.com"];

// Create the database table if it doenst exist
createDBTable();

app.get(`/pingsDB/`, async (req, res) => {
    //TODO: Switch to chunks instead?
    try {
        const tableData = await getTableData(req.query.url);
        res.send(tableData);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.get(`/ping`, async (req, res) => {
    const result = await insertPings(urls);
    console.log(result);
    res.send(result);
});

app.get(`/startPingLoop`, (req, res) => {
    if (currentInterval === undefined) {
        currentInterval = setInterval(() => {
            insertPings(urls).then(res => {
                console.log(res);
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
