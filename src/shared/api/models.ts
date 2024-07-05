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

export type GetCharactersResponse = {
  results: Character[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
};

export type Pagination = {
  next: string | null;
  prev: string | null;
  count: number;
  pages: number;
};
