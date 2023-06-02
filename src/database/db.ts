import { count } from 'console';
import Dexie from 'dexie';

interface Apikey {
  id?: number;
  apikey: string;
  model: string
}
interface MessageTitle {
  id?: number;
  chatId: string;
  title: string;
}
interface Message {
  id?: number;
  chatId: string;
  userContent: string;
  assistantContent: string;
}
// 定义数据库和表结构
class MyDatabase extends Dexie {
  Apikey: Dexie.Table<Apikey, number>;
  messages: Dexie.Table<Message, number>;
  messagetitles: Dexie.Table<MessageTitle, number>;
  constructor() {
    super('myDatabase');
    this.version(3).stores({
      Apikey: '++id, apikey,model',
      messages: '++id,chatId,userContent,assistantContent',
      messagetitles: '++id,chatId,title',
    });

    this.Apikey = this.table('Apikey');
    this.messages = this.table('messages');
    this.messagetitles = this.table('messagetitles');

  }
}

export const db = new MyDatabase();

export function check(): boolean {

  db.Apikey.toArray().then((data: Apikey[]) => {
    if (data.length == 0) return false;
    else if (data[0].apikey == "" || data[0].model == "") {
      return false;
    }
    else return true;
  })

  return true;
}

export async function clearMessageData() {
  db.messages.clear();
  db.messagetitles.clear();
}
