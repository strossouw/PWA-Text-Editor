import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('text', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
  
  // TODO: Add logic for a method that gets all the content from the database
  export const getDb = async () => {
    console.log('GET from database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('text', 'readonly');
    const store = tx.objectStore('text');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
  };


// TODO: Add logic for a method that gets all the content from the database
export const putDb = async (content) => {
  console.log('putDb to database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('text', 'readwrite');
  const store = tx.objectStore('text');
  const request = store.put({ id: 1, content: content });
  const result = await request;
  console.log(' - data saved to the database', result);
};

initdb();
