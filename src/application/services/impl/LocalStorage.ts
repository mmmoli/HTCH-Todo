import localForage from "localforage";
import { LocalStorageService } from "../interfaces/LocalStorage";

export class LocalforageService implements LocalStorageService {
  private store: LocalForage;

  constructor(opts?: LocalForageOptions) {
    const defaults: LocalForageOptions = { name: "htch-notes", ...opts };
    this.store = localForage.createInstance(defaults);
  }

  list<T = unknown>(): Promise<T[]> {
    let result: T[] = [];
    return this.store.iterate<T, T[]>(
      (value) => [...result, value],
      (err, res) => Promise.resolve(err ? [] : res)
    );
  }

  get<T>(key: string): Promise<T | null> {
    return this.store.getItem<T>(key);
  }

  set<T>(key: string, value: T): Promise<T> {
    return this.store.setItem<T>(key, value);
  }
}
