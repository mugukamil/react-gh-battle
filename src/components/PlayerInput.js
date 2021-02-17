import { useState } from "react";

export default function PlayerInput(props) {
  const [username, setUsername] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    props.onSubmit(props.id, username);
  }
  return (
    <form onSubmit={handleSubmit} className="column">
      <label className="header">
        {props.label}{" "}
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
        />
      </label>
      <input type="submit" value="Submit" disabled={!username} />
    </form>
  );
}
