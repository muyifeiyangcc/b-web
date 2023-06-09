import dayjs from 'dayjs'
/**
 *格式化时间戳
 * @param {string} timeStamp
 * @returns
 */

export function formatTime(timeStamp) {
  let time = dayjs(timeStamp).isBefore(Date.now(), 'day')
  if (time) {
    if (dayjs(Date.now()).date() - dayjs(timeStamp).date() === 1) {
      return 'yesterday'
    }
    else {
      return `${dayjs(timeStamp).format('MM-DD')}`
    }
  }
  else {
    return `${dayjs(timeStamp).format('HH:mm')}`
  }
}

export function formatCount(count) {
  if (count < 60) {
    return `00:${count}`
  } else {
    return `${Math.floor(count / 60)}:${count % 60}`
  }
}
//计算朋友圈时间
export function getMomentsTime(createTime) {
  const time = Math.floor((Date.now() - dayjs(createTime).valueOf()) / 60000)//time为分钟
  if (time === 0)
    return 'now'
  if (time > 0 && time < 60)
    return `${time} Minutes Ago`
  if (time >= 60 && time < 60 * 24)
    return `${Math.floor(time / 60)} Hours Ago`
  if (time >= 60 * 24)
    return `${dayjs(createTime).format('MM-DD')}`
}

// 获取国家emoji
export function getEmoji(countryId) {
  const userStore = useUserStore()
  if (countryId === '') {
    return ''
  }
  else {
    const result = userStore.countryList.filter((item) => {
      if (item.locale === countryId)
        return item
    })
    if (result.length > 0)
      return result[0].emoji
  }
  return
}


/**
 * 函数防抖
 * @param {*} fn
 * @param {*} delay
 * @returns
 */
// export function debounce(fn, delay) {
//   delay = delay || 1000
//   let timer = null
//   return function () {
//     const context = this
//     const arg = arguments
//     if (timer)
//       clearTimeout(timer)
//     timer = setTimeout(() => {
//       console.log(123);
//       fn.apply(context, arg)
//     }, delay)
//   }
// }
export function debounce(fn, delay) {
  let time = null;//time用来控制事件的触发
  return function () {
    if (time !== null) {
      clearTimeout(time);
    }
    time = setTimeout(() => {
      fn.call(this);
      //利用call(),让this的指针从指向window 转成指向input
    }, delay)
  }
}

/**
 * 节流函数
 * @param {*} fn
 * @param {*} delay
 * @returns
 */

export function throttle(fn, delay = 300) {
  let timer = null
  return function () {
    const context = this
    const args = arguments
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args)
        clearTimeout(timer)
      }, delay)
    }
  }
}