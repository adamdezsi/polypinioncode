import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Button } from "semantic-ui-react";

function App() {
  const [count, setCount] = useState(0);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3030",
  });

  useEffect(() => {
    getVoteCount();
  }, []);

  const getVoteCount = async () => {
    try {
      const response = await axiosInstance.get("api/vote-count");
      console.log(count);
      setCount(response.data.count);
    } catch (error) {
      console.error(`Error while fetching vote count: ${error}`);
    }
  };

  const handleVote = async (voteType: string) => {
    try {
      await axiosInstance.post(`/api/${voteType}`);
      console.log(`/api/${voteType}`);
      getVoteCount();
      console.log(`Voted!`);
    } catch (error) {
      console.error(`Error while submitting vote: ${error}`);
    }
  };

  return (
    <>
      <div>Dear (hopefully) Future Colleague, welcome to my test solution!</div>
      <h1>{`Vote count: ${count}`}</h1>
      <Button onClick={() => handleVote("downvote")}>-</Button>
      <Button onClick={() => handleVote("upvote")}>+</Button>
      <Button onClick={() => getVoteCount}>Test</Button>
    </>
  );
}

export default App;
