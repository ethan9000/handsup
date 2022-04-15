import * as React from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function Poll() {
  const [voteCount, setVoteCount] = useState(0);
  const [voteCount2, setVoteCount2] = useState(0);
  const [disable, setDisabled] = useState(false);

  const voteCounter1 = () => {
    setVoteCount((voteCount) => voteCount + 1);
  };

  const voteCounter2 = () => {
    setVoteCount2((voteCount2) => voteCount2 + 1);
  };

  const percentage1 = Math.round(((voteCount + voteCount) / 100) * 100);
  const percentage2 = Math.round(((voteCount + voteCount2) / 100) * 100);

  return (
    <div className="poll">
      <Card style={{ width: "25rem" }}>
        <Card.Img variant="top" src="logo192.png" />
        <Card.Body>
          <div className="container">
            <div>
              <Button
                className="Button"
                size="lg"
                disabled={disable}
                onClick={() => {
                  setDisabled(true);
                  voteCounter1();
                }}
              >
                Poll 1
              </Button>
              <div>Votes: {voteCount}</div>
              <div>Percentage: {percentage1}%</div>
            </div>

            <div>
              <Button
                className="Button"
                size="lg"
                disabled={disable}
                onClick={() => {
                  setDisabled(true);
                  voteCounter2();
                }}
              >
                Poll 2
              </Button>
              <div>Votes: {voteCount2} </div>
              <div>Percentage: {percentage2}%</div>
            </div>
          </div>
        </Card.Body>
      </Card>
      <br />
    </div>
  );
}
export default Poll;
