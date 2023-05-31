import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./style.css";
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/message-box/style/css';
import "element-plus/theme-chalk/dark/css-vars.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
