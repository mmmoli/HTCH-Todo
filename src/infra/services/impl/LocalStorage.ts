import localForage from "localforage";
import { LocalStorageService } from "../interfaces/LocalStorage";

export class LocalforageService implements LocalStorageService {
  private store: LocalForage;

  constructor() {
    this.store = localForage.createInstance({
      name: "htch-notes",
    });
  }

  get<T>(key: string): Promise<T | null> {
    return this.store.getItem<T>(key);
  }

  set<T>(key: string, value: T): Promise<T> {
    return this.store.setItem<T>(key, value);
  }
}
