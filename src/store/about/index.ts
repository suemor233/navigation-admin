import { ref } from 'vue';
import { acceptHMRUpdate, defineStore } from "pinia";

export const useAbout = defineStore('useAbout', () => {

  const about = ref<AboutType | null>(null)

  

  return {

  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAbout, import.meta.hot))