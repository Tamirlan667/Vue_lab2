import LitepieDatepicker from "litepie-datepicker";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("LitepieDatepicker", LitepieDatepicker);
});
