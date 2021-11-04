import { Inject, Injectable, InjectionToken } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  prefix: string;
  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {
    this.prefix = 'rlgl';
  }

  setPrefix(prefixRef: string) {
    this.prefix = prefixRef;
  }

  get(key: string): string {
    return this.storage.getItem(key) || '';
  }

  set(key: string, data: string) {
    // const jsonData = JSON.stringify(data)
    return this.storage.setItem(key, data);
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }

  hasOwnProperty(key: string) {
    return this.storage.hasOwnProperty(key);
  }

  clear() {
    this.storage.clear();
  }

}
