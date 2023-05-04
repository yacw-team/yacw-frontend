import { createApp } from "vue";
import App from "./App.vue";
import ModalItem from "../src/components/ModalItem.vue"
import OpenInterface from "../src/components/Openinterface.vue"
import AIcharacter from "../src/components/AIcharacter.vue"
// import SideBar from "../src/components/SideBar.vue"
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
app.component('OpenInterface',OpenInterface).component('ModalItem',ModalItem)//.component('SideBar',SideBar)
   .component('AIcharacter',AIcharacter);
app.use(ElementPlus);
app.mount("#app");