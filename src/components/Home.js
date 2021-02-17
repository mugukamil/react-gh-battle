import { Link } from "react-router-dom";

export default function Home(props) {
  return (
    <div className="home-container">
      <h1>Github battle: Battle your friends...</h1>
      <Link to="/battle" className="btn btn--black">
        Battle
      </Link>
    </div>
  );
}
