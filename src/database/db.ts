import Dexie from 'dexie';

interface Apikey {
  id?: number;
  apikey: string;
  model: string
}
interface MessageTitle{
  chatId:string;
  title:string;
}
interface Message {
  chatId: string;
  userContent: string;
  assistantContent: string;
  userMsgId: string;
  assMsgId: string;
}
// 定义数据库和表结构
class MyDatabase extends Dexie {
  Apikey: Dexie.Table<Apikey, number>;
  messages: Dexie.Table<Message>;
  messagetitles:Dexie.Table<MessageTitle>;
    constructor() {
    super('myDatabase');
    this.version(1).stores({
      Apikey: '++id, apikey,model',
      messages: '++id,chatId,usercontent,assistantcontent,usermsgid,assmsgid',
      messagetitles:'++id,chatId,title',
    });

    this.Apikey = this.table('Apikey');
    this.messages = this.table('messages');
    this.messagetitles=this.table('messagetitles');

  }
}

export const db = new MyDatabase();



db.transaction('rw', db.messages, async function () {
  db.messages.bulkAdd([
    {
      chatId: "1",
      userContent: "你好1/1/1",
      assistantContent: "你好1/2/1",


      userMsgId: "1",
      assMsgId: "2",

    },
    {
      chatId: "1",
      userContent: "你好1/1/2",
      assistantContent: "你好1/2/2",


      userMsgId: "1",
      assMsgId: "2",

    },
    {
      chatId: "1",
      userContent: "你好1/1/3",
      assistantContent: "你好1/2/3",


      userMsgId: "1",
      assMsgId: "2",

    },
    {
      chatId: "2",
      userContent: "你好2/1/1",
      assistantContent: "你好2/2/1",


      userMsgId: "1",
      assMsgId: "2",

    },
    {
      chatId: "2",
      userContent: "你好2/1/2",
      assistantContent: "你好2/2/2",


      userMsgId: "1",
      assMsgId: "2",

    },
    {
      chatId: "2",
      userContent: "你好2/1/3",
      assistantContent: "你好2/2/3",


      userMsgId: "1",
      assMsgId: "2",

    },
    {
      chatId: "3",
      userContent: "你好3/1/1",
      assistantContent: "你好3/2/1",


      userMsgId: "1",
      assMsgId: "2",

    },
    {
      chatId: "3",
      userContent: "你好3/1/2",
      assistantContent: "你好3/2/2",


      userMsgId: "1",
      assMsgId: "2",

    },
    {
      chatId: "3",
      userContent: "你好3/1/3",
      assistantContent: "你好3/2/3",


      userMsgId: "1",
      assMsgId: "2",

    },
  ]);
}).then(function () {
  console.log('初始化数据添加成功');
}).catch(function (error) {
  console.error(error.stack || error);
});

db.transaction('rw', db.messagetitles, async function () {
  db.messagetitles.bulkAdd([
    {
      chatId:"1",
      title:"标题1",
    },
    {
      chatId:"2",
      title:"标题2",
    },
    {
      chatId:"2",
      title:"标题2",
    },
  ]);
}).then(function () {
  console.log('初始化数据添加成功2');
}).catch(function (error) {
  console.error(error.stack || error);
});
