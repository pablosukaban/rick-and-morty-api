import { makeAutoObservable, runInAction } from 'mobx';
import { apiInstance } from '../../../shared/api/';
import { Character } from '../../../shared/api/';

export class CharsItemStore {
  constructor() {
    makeAutoObservable(this);
  }

  fetchData: Character | null = null;

  isLoading = false;

  init = (id: string) => {
    this.getCharacter(id);
  };

  getCharacter = async (id: string) => {
    this.isLoading = true;

    try {
      const response = await apiInstance.get<Character>(`/character/${id}`);

      runInAction(() => {
        this.fetchData = response.data;
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}
