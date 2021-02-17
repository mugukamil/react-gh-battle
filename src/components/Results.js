import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { battle } from "../utils/api";
import PlayerPreview from "./PlayerPreview";
import Loading from "./Loading";

function Profile({ profile }) {
  return (
    <div className="text-left mt-2">
      <ul>
        <li>{profile.name}</li>
        <li>{profile.location}</li>
        <li>followers: {profile.followers}</li>
        <li>following: {profile.following}</li>
        <li>public repos: {profile.public_repos}</li>
        {profile.twitter_username && (
          <li>
            <a href={`https://twitter.com/${profile.twitter_username}`}>
              @{profile.twitter_username}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

function Player({ profile, score, isWinner }) {
  return (
    <div className="column">
      <h1>{isWinner ? "Winner" : "Loser"}</h1>
      <h3>Score: {score}</h3>
      <PlayerPreview
        id="PlayerOne"
        avatar={profile.avatar_url}
        username={profile.login}
      ></PlayerPreview>
      <Profile profile={profile}></Profile>
    </div>
  );
}

export default function Results(props) {
  const { search } = useLocation();
  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPlayers() {
      let playerNames = queryString.parse(search);
      const result = await battle([
        playerNames.playerOne,
        playerNames.playerTwo,
      ]);
      setWinner(result[0]);
      setPlayers(result);
      setLoading(false);
    }

    getPlayers();
  }, [search]);
  return (
    <div className="row">
      {loading && <Loading />}
      {!loading &&
        players.map(({ profile, score }) => (
          <Player
            key={profile.id}
            profile={profile}
            score={score}
            isWinner={winner?.profile.id === profile.id}
          />
        ))}
    </div>
  );
}
