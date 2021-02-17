import PropTypes from "prop-types";

export default function PlayerPreview({ avatar, username, children }) {
  return (
    <div className="column">
      <img src={avatar} alt={username} className="avatar" />
      <h2 className="username">@{username}</h2>
      {children}
    </div>
  );
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
