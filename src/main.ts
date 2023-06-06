import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'

// import Previewer from 'virtual:vue-component-preview'
import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

import NIMSDK from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK'
// 本机用
// account: '1ef27c9ebb064b66989b523c0d108c37',//云信账号
// token: '4fc8f80b57f0a9afd83b86490b11fb9b',//云信密码
// 测试机用
// account: '452de602d2594517a6c987f2f3d8b1c4',//云信账号
// token: 'f2a243ad6395580befd8c74b2eac6fa3',//云信密码
export const nim = NIMSDK.getInstance({
  appkey: '124f689baed25c488e1330bc42e528af',
  account: '1ef27c9ebb064b66989b523c0d108c37', // 云信账号
  token: '4fc8f80b57f0a9afd83b86490b11fb9b', // 云信密码
  debugLevel: 'debug',
})

if (nim.status === 'unconnected') {
  // then，receive event 'logined'
  await nim.connect()
}

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    // ctx.app.use(Previewer)
  },
)
