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

export class CharsListStore {
  searchValue = '';
  fetchData: Character[] = [];
  nextPage: string | null = null;
  prevPage: string | null = null;

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
          this.nextPage = response.data.info.next;
          this.prevPage = response.data.info.prev;
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

  getNextPage = async () => {
    if (!this.nextPage) return;

    this.isLoading = true;

    try {
      const response = await apiInstance.get<Response>(this.nextPage);

      if (response.data) {
        runInAction(() => {
          this.fetchData = response.data.results;
          this.nextPage = response.data.info.next;
          this.prevPage = response.data.info.prev;
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

  getPrevPage = async () => {
    if (!this.prevPage) return;

    this.isLoading = true;

    try {
      const response = await apiInstance.get<Response>(this.prevPage);

      if (response.data) {
        runInAction(() => {
          this.fetchData = response.data.results;
          this.prevPage = response.data.info.prev;
          this.nextPage = response.data.info.next;
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

  setSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.searchValue = event.target.value;
  };
}
