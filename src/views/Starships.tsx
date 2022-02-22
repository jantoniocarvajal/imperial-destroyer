import React from "react";
import { imageStarship, Starship } from "../api/model";
import { Card } from "../components/Card";
import { Loader } from "../components/Loader";
import { useRestApiClient } from "../components/PageContext";
import "./starships.scss";

export function Starships() {
  const apiClient = useRestApiClient();
  const [loading, setLoading] = React.useState<boolean>(false);

  const [totalStarships, setTotalStarships] = React.useState<number>(0);
  const [starships, setStarships] = React.useState<Starship[] | undefined>();
  const [fiterStarships, setFiterStarships] = React.useState<Starship[] | undefined>();

  const [previous, setPrevious] = React.useState<string | undefined>();
  const [next, setNext] = React.useState<string | undefined>();

  const [search, setSearch] = React.useState<string>("");
  const [sorted, setSorted] = React.useState<number>(0);

  React.useEffect(() => {
    loadStarships();
  }, []);

  function loadStarships(page?: number) {
    setLoading(true);
    apiClient
      .getStarships(page)
      .then((response) => {
        setTotalStarships(response.count);
        setStarships(response.results);
        setFiterStarships(response.results);
        setPrevious(response.previous);
        setNext(response.next);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function searchStarships() {
    setLoading(true);
    apiClient
      .searchStarships(search)
      .then((response) => {
        setTotalStarships(response.count);
        setStarships(response.results);
        setFiterStarships(response.results);
        setPrevious(response.previous);
        setNext(response.next);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function loadNext() {
    if (next) {
      const index = next.indexOf("=");
      const page = parseInt(next.substring(index + 1));
      loadStarships(page);
    }
  }

  function loadPrevious() {
    if (previous) {
      const index = previous.indexOf("=");
      const page = parseInt(previous.substring(index + 1));
      loadStarships(page);
    }
  }

  function sortedStarships() {
    if (sorted === 0) {
      setFiterStarships(starships);
    } else if (sorted === 1) {
      const newSorted = starships?.sort((a, b) => a.crew.localeCompare(b.crew));
      setFiterStarships(newSorted);
    } else if (sorted === 2) {
      const newSorted = starships?.sort((a, b) => a.cargo_capacity.localeCompare(b.cargo_capacity));
      setFiterStarships(newSorted);
    }
  }

  return (
    <div className="container">
      <div className="search-bar">
        <h2>Planets</h2>
        <div className="search-content">
          <input type="text" placeholder="Search.." name="search" onChange={(e) => setSearch(e.target.value)} />
          <button onClick={() => searchStarships()}>
            <i className="fa fa-search"></i>
          </button>
        </div>
        <div className="sorted-content">
          <select onChange={(e) => setSorted(e.target.selectedIndex)}>
            <option>no filter</option>
            <option>crew</option>
            <option>cargo capacity</option>
          </select>
          <button onClick={sortedStarships}>
            <i className="fa fa-sort-amount-asc"></i>
          </button>
        </div>
      </div>
      {loading || !starships ? (
        <Loader />
      ) : (
        <div className="row-cards">
          {fiterStarships &&
            fiterStarships.map((starship, index) => {
              return (
                <div className="column-card" key={`${starship.name}-${index}`}>
                  <Card
                    image={imageStarship(starship.name)}
                    title={starship.name}
                    subtitle={starship.model}
                    info={`${starship.passengers} passengers`}
                    showIcons={starship.passengers !== "n/a"}
                  />
                </div>
              );
            })}
        </div>
      )}
      <div className="pagination">
        <button disabled={!previous} onClick={loadPrevious}>
          &laquo;
        </button>
        <p>{`1 to ${starships?.length} of ${totalStarships} starships`}</p>
        <button disabled={!next} onClick={loadNext}>
          &raquo;
        </button>
      </div>
    </div>
  );
}
