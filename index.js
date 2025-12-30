import express from "express";
import { promises as fs } from "fs";
import cors from "cors";
import cron from "node-cron"; //es module for cron task
import cookieParser from "cookie-parser"; // let read cookies from the browser
const app = express(); //create instance of the express application
app.use(express.json()); // allow the server to accept json data
app.use(express.urlencoded({ extended: true })); //req.body allow the serve to read data from the html forms : name=John&age=30

const port = 3000;
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.get("/log-visit", (req, res) => {
    const logMessage = `Visit at ${new Date().toLocaleDateString()}\n`;
    fs.appendFile("log.txt", logMessage, (err) => {
        if (err) {
            console.error("Failed to write to file", err);
            return res.status(500).send("Server error!");
        }
        console.log("Log save to disk!");
    });
    res.send("Your visit has been recorded in log.txt!");
});
/** 
* * * * *
│ │ │ │ │
│ │ │ │ └─ Day of the week (0-7, 0 or 7 = Sunday)
│ │ │ └── Month (1-12)
│ │ └── Day of the month (1-31)
│ └── Hour (0-23)
└── Minute (0-59)
*/
cron.schedule("* * * * *", () => {
    console.log("Cron job executed at", new Date().toLocaleTimeString());
});

app.get("/read-logs", async (req, res) => {
    try {
        // 'await' waits for the file to read without blocking other users
        const data = await fs.readFile("log.txt", "utf-8");
        res.send(`<pre>${data}</pre>`);
    } catch (error) {
        res.send("No logs found yet. Visit /log-visit first!");
    }
});
app.listen(port, () => {
    console.log("Server is Running!");
});
