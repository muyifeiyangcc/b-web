import NIMSDK from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK'
// 本机用
// account: '1ef27c9ebb064b66989b523c0d108c37',//云信账号
// token: '4fc8f80b57f0a9afd83b86490b11fb9b',//云信密码
// 测试机用
// account: '452de602d2594517a6c987f2f3d8b1c4',//云信账号
// token: 'f2a243ad6395580befd8c74b2eac6fa3',//云信密码
const nim = NIMSDK.getInstance({
  appkey: '124f689baed25c488e1330bc42e528af',
  account: '1ef27c9ebb064b66989b523c0d108c37', // 云信账号
  token: '4fc8f80b57f0a9afd83b86490b11fb9b', // 云信密码
  debugLevel: 'debug',
})
//   nim.on('msg', (res) => {
//     console.log('收到新消息', res);
//     getHistoryTalkList()
// });
export const imConnect = async ()=>{
  console.log(123,nim);
  
// if (nim.status === 'unconnected') {
//   // then，receive event 'logined'
//   await nim.connect()
// }
}
