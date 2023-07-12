export interface GetRechargeListOpt {
    recommendSendPercent: number,
    batchNo: string,
    diamondNum: number,
    originalPrice: number,
    price: number,
    platformType: string,
    icon?: string,
    firstChargeGive: number,
    giveDiamondNum: number,
    recommend: number,
    id: number
}
export interface HeartbeatOpt {
    channelId: string,
    free?: 0 | 1,
    receiverYxAccid: string
    remark: string
    type: string
}
export interface HeartbeatData {
    diamondNum: number,
    nextBalanceIsSufficient: 0 | 1,
    nextRequestInterval: number
}