import { makeAutoObservable, runInAction } from 'mobx';
import { apiInstance } from '../../../shared/api/base';
import { Character } from '../../../shared/api/models';

type Response = {
  results: Character[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
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
      const params = this.searchValue ? { name: this.searchValue } : {};
      const response = await apiInstance.get<Response>('/character', {
        params,
      });

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

  getCharactersByPage = async (pageType: 'prev' | 'next') => {
    const page = pageType === 'prev' ? this.prevPage : this.nextPage;

    if (!page) return;

    this.isLoading = true;

    try {
      const response = await apiInstance.get<Response>(page);

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

  setSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.searchValue = event.target.value;
  };
}
