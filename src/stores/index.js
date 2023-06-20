import { createPinia } from 'pinia'
import useHomeStore from './home'
import useMomentsStore from './moments'
import useUserStore from './user'
import useGiftStore from './gift'
// import useUploadStore from './upload'
const pinia = createPinia()
export { useHomeStore,useMomentsStore,useUserStore,useGiftStore }
export default pinia
