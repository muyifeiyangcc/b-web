import { createPinia } from 'pinia'
import useHomeStore from './home'
import useMomentsStore from './moments'
import useUserStore from './user'
import useGiftStore from './gift'
import useSystemStore from './system'
// import useUploadStore from './upload'
const pinia = createPinia()
export { useHomeStore,useMomentsStore,useUserStore,useGiftStore,useSystemStore }
export default pinia
