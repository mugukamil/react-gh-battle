import { useState } from "react";
import PlayerInput from "./PlayerInput";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PlayerPreview from "./PlayerPreview";

export default function Battle(props) {
  const [playerOneName, setPlayerOneName] = useState("");
  const [playerOneImage, setPlayerOneImage] = useState("");
  const [playerTwoName, setPlayerTwoName] = useState();
  const [playerTwoImage, setPlayerTwoImage] = useState();

  function handleSubmit(id, username) {
    if (id === "PlayerOne") {
      setPlayerOneName(username);
      setPlayerOneImage(`https://github.com/${username}.png?size=200`);
    } else if (id === "PlayerTwo") {
      setPlayerTwoName(username);
      setPlayerTwoImage(`https://github.com/${username}.png?size=200`);
    }
  }

  function handleReset(id) {
    if (id === "PlayerOne") {
      setPlayerOneName("");
      setPlayerOneImage("");
    } else if (id === "PlayerTwo") {
      setPlayerTwoName("");
      setPlayerTwoImage("");
    }
  }

  console.log(playerOneName);

  return (
    <div className="text-center">
      <div className="row">
        {playerOneName}
        {!playerOneName ? (
          <PlayerInput
            id="PlayerOne"
            label="Player One"
            onSubmit={handleSubmit}
          />
        ) : (
          <PlayerPreview avatar={playerOneImage} username={playerOneName}>
            <button
              className="btn reset"
              onClick={() => handleReset("PlayerOne")}
            >
              Reset
            </button>
          </PlayerPreview>
        )}
        {!playerTwoName ? (
          <PlayerInput
            id="PlayerTwo"
            label="Player Two"
            onSubmit={handleSubmit}
          />
        ) : (
          <PlayerPreview avatar={playerTwoImage} username={playerTwoName}>
            <button
              className="btn reset"
              onClick={() => handleReset("PlayerTwo")}
            >
              Reset
            </button>
          </PlayerPreview>
        )}
      </div>
      {playerOneImage && playerTwoImage ? (
        <Link
          className="btn btn--black"
          to={{
            pathname: "/battle/results",
            search: `?playerOne=${playerOneName}&playerTwo=${playerTwoName}`,
          }}
        >
          Battle
        </Link>
      ) : null}
    </div>
  );
}
