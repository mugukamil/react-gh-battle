import axios from "axios";

const token = "732f25f0858c15ffff2e217f6deb9ada862df4c3";

async function getProfile(username) {
  const result = await axios.get(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  return result.data;
}

async function getRepos(username) {
  const result = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  );

  return result.data;
}

function getStarCount(repos) {
  return repos.reduce((count, repo) => count + repo.stargazers_count, 0);
}

function calculateScore(profile, repos) {
  const followers = profile.followers;
  var totalStar = getStarCount(repos);

  return followers * 3 + totalStar;
}

async function getUserData(player) {
  const result = await axios.all([getProfile(player), getRepos(player)]);
  const [profile, repos] = result;

  return { profile, score: calculateScore(profile, repos) };
}

function sortPlayers(players) {
  return players.sort((p1, p2) => p2.score - p1.score);
}

export async function battle(players) {
  const result = await axios.all(players.map(getUserData));

  return sortPlayers(result);
}

export async function fetchPopularRepos(lang) {
  const encodedURI = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories`
  );

  return await axios.get(encodedURI, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
}
