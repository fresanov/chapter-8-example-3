const express = require("express");
const fs = require("fs");

const app = express();

//
// Throws an error if the PORT environment variable is missing.
//
if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

//
// Extracts the PORT environment variable.
//
const PORT = process.env.PORT;

//
// Registers a HTTP GET route for video streaming.
//
app.get("/video", async (req, res) => { // Route for streaming video.

    const videoPath = "./videos/SampleVideo_1280x720_1mb.mp4";
    const stats = await fs.promises.stat(videoPath);

    res.writeHead(200, {
        "Content-Length": stats.size,
        "Content-Type": "video/mp4",
    });
    fs.createReadStream(videoPath).pipe(res);
});

//
// Home handler which acts as a video player.
//
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Video Stream</title>
        </head>
        <body>
        <h1>Video Stream</h1>
            <video controls width="500">

                <source src="/video" type="video/mp4">
                Sorry, your browser doesn't support embedded videos.
            </video>
        </body>
        </html>
    `);
});

//
// Starts the HTTP server.
//
app.listen(PORT, () => {
    console.log(`Microservice online.`);
});
