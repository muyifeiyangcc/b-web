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

