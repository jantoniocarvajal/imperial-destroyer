export interface PageCollection<T extends Planet | Starship> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export function imagePlanet(name: string) {
  switch (name.toLowerCase()) {
    case "alderaan":
      return "img/planets/alderaan.jpg";

    case "bespin":
      return "img/planets/bespin.png";

    case "coruscant":
      return "img/planets/coruscant.png";

    case "dagobah":
      return "img/planets/dagobah.jpg";

    case "endor":
      return "img/planets/endor.png";

    case "hoth":
      return "img/planets/hoth.png";

    case "kamino":
      return "img/planets/kamino.jpg";

    case "naboo":
      return "img/planets/naboo.png";

    case "tatooine":
      return "img/planets/tatooine.png";

    case "yaviniv":
      return "img/planets/yaviniv.png";

    default:
      return "img/planets/tatooine.png";
  }
}

export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}
