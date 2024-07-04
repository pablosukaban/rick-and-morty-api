import { makeAutoObservable, runInAction } from 'mobx';
import { apiInstance } from '../../../shared/api/base';
import { Character } from '../../chars-list/store';

export class CharsItemStore {
  constructor() {
    makeAutoObservable(this);
  }

  fetchData: Character | null = null;

  isLoading = false;

  init = async () => {
    this.getCharacter();
  };

  getCharacter = async () => {
    this.isLoading = true;

    try {
      const response = await apiInstance.get<Character>(`/character/1`);

      if (response.data) {
        runInAction(() => {
          this.fetchData = response.data;
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
