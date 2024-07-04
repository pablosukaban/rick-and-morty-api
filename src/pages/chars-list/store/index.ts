import { makeAutoObservable, runInAction } from 'mobx';
import { apiInstance } from '../../../shared/api/base';
import { Character } from '../../../shared/api/models';
import { ChangeEvent } from 'react';

type Response = {
  results: Character[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
};

type Pagination = {
  next: string | null;
  prev: string | null;
  count: number;
  pages: number;
};

export class CharsListStore {
  searchValue = '';

  charactersList: Character[] = [];
  pagination: Pagination = {
    next: null,
    prev: null,
    count: 0,
    pages: 0
  };

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
      const params = this.searchValue ? { name: this.searchValue } : {};
      const response = await apiInstance.get<Response>('/character', {
        params
      });

      if (response.data) {
        runInAction(() => {
          this.charactersList = response.data.results;
          this.pagination = response.data.info;
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

  getCharactersByPage = async (_event: ChangeEvent<unknown>, page: number) => {
    if (!page) return;

    this.isLoading = true;

    try {
      const response = await apiInstance.get<Response>('/character', {
        params: {
          page
        }
      });

      if (response.data) {
        runInAction(() => {
          this.charactersList = response.data.results;
          this.pagination = response.data.info;
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
