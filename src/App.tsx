import { useState } from "react";
import "./App.css";
import { Button } from "semantic-ui-react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>Dear (hopefully) Future Colleague, welcome to my test solution!</div>
      <h1>Vote count:</h1>
      <Button>-</Button>
      <Button>+</Button>
    </>
  );
}

export default App;
