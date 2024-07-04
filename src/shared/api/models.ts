type Location = {
  name: string;
};

export type Character = {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: Location;
  name: string;
  origin: Location;
  species: string;
  status: string;
  type: string;
  url: string;
};
