import { openDB } from 'idb';

const dbRef = openDB(`TubeDB`, 1, {
  upgrade(ref) {
    const osNames: any = ref.objectStoreNames;
    if (!osNames.contains('General')) {
      ref.createObjectStore(`General`, {
        keyPath: `ID`,
        autoIncrement: true
      });
    }
    if (!osNames.contains('Subscriptions')) {
      const osRef = ref.createObjectStore(`Subscriptions`, {
        keyPath: `ID`,
        autoIncrement: true
      });
      osRef.createIndex(`channelTag`, `channelTag`, {
        unique: true
      });
    }
    if (!osNames.contains('CacheInfo')) {
      ref.createObjectStore(`CacheInfo`, {
        keyPath: `ID`,
        autoIncrement: true
      });
    }
    if (!osNames.contains('Query')) {
      const osRef = ref.createObjectStore(`Query`, {
        keyPath: `ID`,
        autoIncrement: true
      });
      osRef.createIndex(`channelTag`, `channelTag`, {
        unique: true
      });
    }
    if (!osNames.contains('LastUpdated')) {
      const osRef = ref.createObjectStore(`LastUpdated`, {
        keyPath: `ID`,
        autoIncrement: true
      });
      osRef.createIndex(`channelTag`, `channelTag`, {
        unique: true
      });
    }
    if (!osNames.contains('CacheControl')) {
      ref.createObjectStore(`CacheControl`, {
        keyPath: `ID`,
        autoIncrement: true
      });
    }
    if (!osNames.contains('Settings')) {
      ref.createObjectStore(`Settings`, {
        keyPath: `ID`,
        autoIncrement: true
      });
    }
    if (!osNames.contains('DefaultSettings')) {
      ref.createObjectStore(`DefaultSettings`, {
        keyPath: `ID`,
        autoIncrement: true
      });
    }
  },
  blocked() {
    console.log(`Blocked`);
  },
  blocking() {
    console.log(`Blocking`);
  }
});

export default dbRef;
