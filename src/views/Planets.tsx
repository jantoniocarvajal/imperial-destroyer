import React from "react";
import { imagePlanet, Planet } from "../api/model";
import { Card } from "../components/Card";
import { Loader } from "../components/Loader";
import { useRestApiClient } from "../components/PageContext";
import "./planets.scss";

export function Planets() {
  const apiClient = useRestApiClient();
  const [loading, setLoading] = React.useState<boolean>(false);

  const [totalPlanets, setTotalPlanets] = React.useState<number>(0);
  const [planets, setPlanets] = React.useState<Planet[] | undefined>();

  const [previous, setPrevious] = React.useState<string | undefined>();
  const [next, setNext] = React.useState<string | undefined>();

  const [search, setSearch] = React.useState<string>("");
  const [sorted, setSorted] = React.useState<number>(0);

  React.useEffect(() => {
    loadPlanets();
  }, []);

  function loadPlanets(page?: number) {
    setLoading(true);
    apiClient
      .getPlanets(page)
      .then((response) => {
        setTotalPlanets(response.count);
        setPlanets(response.results);
        setPrevious(response.previous);
        setNext(response.next);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function searchPlanet() {
    setLoading(true);
    apiClient
      .searchPlanets(search)
      .then((response) => {
        setTotalPlanets(response.count);
        setPlanets(response.results);
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
      loadPlanets(page);
    }
  }

  function loadPrevious() {
    if (previous) {
      const index = previous.indexOf("=");
      const page = parseInt(previous.substring(index + 1));
      loadPlanets(page);
    }
  }

  function sortedPlanets() {
    if (sorted === 0) {
      const newSorted = planets?.sort((a, b) => a.name.localeCompare(b.name));
      setPlanets(newSorted);
    }
  }

  return (
    <div className="container">
      <div className="search-bar">
        <h2>Planets</h2>
        <div className="search-content">
          <input type="text" placeholder="Search.." name="search" onChange={(e) => setSearch(e.target.value)} />
          <button onClick={() => searchPlanet()}>
            <i className="fa fa-search"></i>
          </button>
        </div>
        <div className="sorted-content">
          <select onChange={(e) => setSorted(e.target.selectedIndex)}>
            <option>name</option>
            <option>population</option>
          </select>
          <button onClick={sortedPlanets}>
            <i className="fa fa-sort-amount-asc"></i>
          </button>
        </div>
      </div>
      {loading || !planets ? (
        <Loader />
      ) : (
        <div className="row-cards">
          {planets &&
            planets.map((planet, index) => {
              return (
                <div className="column-card" key={`${planet.name}-${index}`}>
                  <Card
                    image={imagePlanet(planet.name)}
                    title={planet.name}
                    subtitle={planet.climate}
                    info={`${planet.population} population`}
                    showIcons={planet.population !== "unknown"}
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
        <p>{`1 to ${planets?.length} of ${totalPlanets} planets`}</p>
        <button disabled={!next} onClick={loadNext}>
          &raquo;
        </button>
      </div>
    </div>
  );
}
