import Dexie, { Table } from 'dexie';

export interface apikey {
 Apikey:string
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  UserApikey: Dexie.Table<apikey>; 

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      UserApikey: 'Apikey' 
    });
    this.UserApikey=this.table('apikey')
  }
}

export const db = new MySubClassedDexie();