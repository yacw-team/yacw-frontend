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

db.Apikey.clear();

db.transaction('rw', db.messages, async function () {
  if (await db.messages.count() == 0) {
    db.messages.bulkAdd([
      {
        chatId: "1",
        userContent: "你好1/1/1",
        assistantContent: "你好1/2/1",
      },
      {
        chatId: "1",
        userContent: "你好1/1/2",
        assistantContent: "你好1/2/2",

      },
      {
        chatId: "1",
        userContent: "你好1/1/3",
        assistantContent: "你好1/2/3",
      },

    ]).then(function () {
      console.log('初始化数据添加成功');
    }).catch(function (error) {
      console.error(error.stack || error);
    });
  }
  else {
    await db.messages.clear();
    db.messages.bulkAdd([
      {
        chatId: "1",
        userContent: "你好1/1/1",
        assistantContent: "你好1/2/1",
      },
      {
        chatId: "1",
        userContent: "你好1/1/2",
        assistantContent: "你好1/2/2",

      },
      {
        chatId: "1",
        userContent: "你好1/1/3",
        assistantContent: "你好1/2/3",
      },

    ]).then(function () {
      console.log('初始化数据添加成功');
    }).catch(function (error) {
      console.error(error.stack || error);
    });
  }

}
)
db.transaction('rw', db.messagetitles, async function () {
  if (await db.messagetitles.count() == 0) {

    db.messagetitles.bulkAdd([
      {
        chatId: "1",
        title: "标题1",
      },

    ]).then(function () {
      console.log('初始化数据添加成功22');
    }).catch(function (error) {
      console.error(error.stack || error);
    })
  } else {
    await db.messagetitles.clear();
    db.messagetitles.bulkAdd([
      {
        chatId: "1",
        title: "标题1",
      },

    ]).then(function () {
      console.log('初始化数据添加成功22');
    }).catch(function (error) {
      console.error(error.stack || error);
    })
  }
}
);