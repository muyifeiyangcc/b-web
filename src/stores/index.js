import { createPinia } from 'pinia'
import useHomeStore from './home'
import useMomentsStore from './moments'
import useUserStore from './user'
const pinia = createPinia()
export { useHomeStore,useMomentsStore,useUserStore }
export default pinia
