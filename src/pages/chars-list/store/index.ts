import { makeAutoObservable, runInAction } from 'mobx';
import { apiInstance, GetCharactersResponse, Pagination } from '../../../shared/api/';
import { ChangeEvent } from 'react';
import { Character } from '../../../shared/api';

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

  init = () => {
    this.getCharacters();
  };

  getCharacters = async () => {
    this.isLoading = true;

    try {
      const params = this.searchValue ? { name: this.searchValue } : {};
      const response = await apiInstance.get<GetCharactersResponse>('/character', {
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
      const response = await apiInstance.get<GetCharactersResponse>('/character', {
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
