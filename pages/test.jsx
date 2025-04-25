import axios from "axios";
import { useEffect, useState } from "react";

export default function TestPage({}) {
  const [token, setToken] = useState("");
  const [query, setQuery] = useState("");
  const [skills, setSkills] = useState([]);

  const getToken = async () => {
    try {
      const res = await axios.get("/api/emsis-token?q=Java");
      setToken(res.data.access_token);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchSkills();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [query]);

  const searchSkills = async () => {
    const response = await axios.get("/api/search-skills", {
      params: {
        q: query,
        limit: 5,
      },
    });

    setSkills(response.data.data);
  };
  return (
    <div>
      <button onClick={getToken}>Get EMSI token</button>
      <div>Token: {token}</div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <div>
        {skills.length > 0
          ? skills.map((skill) => <div>{skill.name}</div>)
          : `No such skills found for query: ${query}`}
      </div>
    </div>
  );
}
