import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import persistStorePlugin from "./plugins/persistStore";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.use(persistStorePlugin);

app.mount("#app");
