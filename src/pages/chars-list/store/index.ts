import { makeAutoObservable, runInAction } from 'mobx';
import { apiInstance } from '../../../shared/api/base';

type Response = {
  results: Character[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
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

export class CharsListStore {
  fetchData: Character[] = [];

  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  init = async () => {
    this.getCharacters();
  };

  getCharacters = async () => {
    this.isLoading = true;

    try {
      const response = await apiInstance.get<Response>('/character');

      if (response.data) {
        runInAction(() => {
          this.fetchData = response.data.results;
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}
