import React, { useEffect, useState } from "react";
import axios from "axios";
import debounce from "lodash/debounce";

interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: string;
}

interface RepositoryListProps {
  query: string;
  page: number;
  setPage: (page: number) => void;
}

export const RepositoryList: React.FC<RepositoryListProps> = ({
  query,
  page,
  setPage,
}) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const debounceFn = debounce(() => {
      axios
        .get(
          `https://api.github.com/search/repositories?q=${query}&page=${page}`
        )
        .then((response) => {
          setRepositories(response.data.items);
          setTotal(response.data.total_count);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, 500);

    debounceFn();

    return debounceFn.cancel;
  }, [query, page]);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const direction = event.currentTarget.dataset.direction;
    if (direction === "prev") {
      setPage(page - 1);
    } else if (direction === "next") {
      setPage(page + 1);
    }
  };

  return (
    <div className="RepositoryList">
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}
      {!loading && query && (
        <div>
          <p>Total results: {total}</p>
          <div className="RepositoryList-wrapper">
            {repositories.map((repo) => (
              <div className="RepositoryList-card" key={repo.id}>
                <h3>{repo.name}</h3>
                <p>{repo.description}</p>
                <div className="RepositoryList-cardFooter">
                  <span>Stars: {repo.stargazers_count}</span>
                  <a href={repo.html_url} target="_blank" rel="noreferrer">
                    View on GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
          {repositories.length ? (
            <div className="RepositoryList-pagination">
              <button
                onClick={handlePageChange}
                data-direction="prev"
                disabled={page === 1}
              >
                Previous
              </button>
              <span>{page}</span>
              <button
                onClick={handlePageChange}
                data-direction="next"
                disabled={repositories.length < 30}
              >
                Next
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};
