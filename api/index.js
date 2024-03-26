import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 3030;
const usedIPList = [];

// our initial counter
let count = 0;

//doube voting filter middleware
const doubleVotingEasyFilter = (req, res, next) => {
  const IP = req.IP;
  if (usedIPList.includes(IP)) {
    return res.status(403).json({ error: "You have already voted." });
  } else {
    usedIPList.push(IP);
    next();
  }
};

// json parsing middleware
app.use(bodyParser.json());
app.use(cors);

app.get("/api/vote-count", (req, res) => {
  res.json({ count: count });
});

app.post("/api/upvote", doubleVotingEasyFilter, (req, res) => {
  count++;
  res.json({ success: true });
});

app.post("/api/downvote", doubleVotingEasyFilter, (req, res) => {
  count--;
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
