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