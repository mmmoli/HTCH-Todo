export abstract class LocalStorageService {
  abstract list<T = unknown>(): Promise<T[]>;
  abstract get<T = unknown>(key: string): Promise<T | null>;
  abstract set<T = unknown>(key: string, value: T): Promise<T>;
}
