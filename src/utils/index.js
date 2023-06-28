import dayjs from 'dayjs'
/**
 *格式化时间戳
 * @param {string} timeStamp
 * @returns
 */

export function formatTime(timeStamp){
    let time=dayjs(timeStamp).isBefore(Date.now(), 'day')
    if(time){
    if(dayjs(Date.now()).date()-dayjs(timeStamp).date()===1){
        return 'yesterday'
    }
    else{
        return `${dayjs(timeStamp).format('MM-DD')}`
    }
    }
    else{
        return `${dayjs(timeStamp).format('HH:mm')}`
    }
    }

    //计算朋友圈时间
export function getMomentsTime (createTime) {
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
export function getEmoji (countryId) {
  const userStore=useUserStore()
  if(countryId===''){
    return ''
  }
  else{
    const result = userStore.countryList.filter((item) => {
        if (item.locale === countryId)
            return item
    })
    if(result.length>0)
      return result[0].emoji
  }
  return
}

const _charStr = 'abacdefghjklmnopqrstuvwxyz0123456789';
/**
 * 随机生成索引
 * @param min 最小值
 * @param max 最大值
 * @param i 当前获取位置
 */
function RandomIndex(min, max, i){
    let index = Math.floor(Math.random()*(max-min+1)+min),
        numStart = _charStr.length - 10;
    //如果字符串第一位是数字，则递归重新获取
    if(i==0&&index>=numStart){
        index = RandomIndex(min, max, i);
    }
    //返回最终索引值
    return index;
}

/**
 * 随机生成字符串
 * @param len 指定生成字符串长度
 */
export function getRandomString(len){
    let min = 0, max = _charStr.length-1, _str = '';
    //判断是否指定长度，否则默认长度为15
    len = len || 15;
    //循环生成字符串
    for(var i = 0, index; i < len; i++){
        index = RandomIndex(min, max, i);
        _str += _charStr[index];
    }
    return _str;
}