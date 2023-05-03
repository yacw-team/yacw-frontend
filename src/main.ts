import { createApp } from "vue";
import App from "./App.vue";
import Modal from "../src/components/Modal.vue"
import Open from "../src/components/Open.vue"
import AIcharacter from "../src/components/AIcharacter.vue"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "./style.css";

const app = createApp(App);

app.use(router);


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('Open',Open).component('Modal',Modal)
  .component('AIcharacter',AIcharacter);
app.use(ElementPlus);
app.mount("#app");