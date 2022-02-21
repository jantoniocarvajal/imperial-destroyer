import { PageCollection, Planet } from "./model";

export type UrlCreator = ReturnType<typeof createUrlCreator>;

function createUrlCreator(apiUrl: string) {
  return {
    planets: (page?: number) => `${apiUrl}/planets${page ? `/?page=${page}` : ""}`,
    searchPlanets: (search: string) => `${apiUrl}/planets/?search=${search}`,
    starships: () => `${apiUrl}/starships`,
  };
}

function checkStatus(response: Response): Promise<Response> {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return response.text().then((text) => {
    throw new Error(`${response.status}: ${text}`);
  });
}

function get(uri: string) {
  return fetch(uri, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  }).then((response) => checkStatus(response));
}

export class RestApiClient {
  public readonly urlCreator: ReturnType<typeof createUrlCreator>;

  constructor(apiUrl: string) {
    this.urlCreator = createUrlCreator(apiUrl);
  }

  public getPlanets(page?: number) {
    return get(this.urlCreator.planets(page))
      .then((response) => checkStatus(response))
      .then<PageCollection<Planet>>((response) => response.json());
  }

  public searchPlanets(search: string) {
    return get(this.urlCreator.searchPlanets(search))
      .then((response) => checkStatus(response))
      .then<PageCollection<Planet>>((response) => response.json());
  }
}
