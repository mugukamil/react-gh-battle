import { useEffect, useState } from "react";
import { fetchPopularRepos } from "../utils/api";
import Loading from "./Loading";

const languages = ["All", "JavaScript", "PHP", "Ruby", "Java", "CSS", "Python"];

const SelectLanguage = (props) => (
  <ul className="languages">
    {languages.map((lang) => (
      <li
        className={props.selectedLang === lang ? "selected" : null}
        key={lang}
        onClick={() => props.setSelectedLang(lang)}
      >
        {lang}
      </li>
    ))}
  </ul>
);

const RepoGrid = ({ repos }) => (
  <div className="popular-items">
    {repos.map((repo, index) => (
      <div key={repo.name} className="popular-item">
        <span className="popular-rank">#{index + 1}</span>
        <img src={repo.owner.avatar_url} alt={repo.name} width="128" />
        <p>
          <a href={repo.html_url}>{repo.name}</a>
        </p>
        <span>@{repo.owner.login}</span>
        <p>{repo.stargazers_count} stars</p>
      </div>
    ))}
  </div>
);

export default function Popular() {
  const [selectedLang, setSelectedLang] = useState("All");
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    updateLanguage(selectedLang);
  }, [selectedLang]);

  async function updateLanguage(lang) {
    setSelectedLang(lang);

    const result = await fetchPopularRepos(selectedLang);
    setRepos(result.data.items);
  }

  return (
    <>
      <SelectLanguage
        selectedLang={selectedLang}
        setSelectedLang={updateLanguage}
      />
      {repos?.length ? (
        <RepoGrid repos={repos}></RepoGrid>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}
