import {defineStore} from 'pinia'

export const useNavbarStore = defineStore('NavbarStore', {
  state: () => ({
    swap: false
  }),
})