export interface GiftListData {
    id: number,
    name: string,
    giftPrice: number,
    giftSmallImg: string,
    giftImg: string,
    vaild: number
}
export interface SendGiftOpt {
    channelId: string | number,
    giftId: number,
    num: number,
    scene: "VIDEO" | "IM" | "PROFILE" | "SHORT_VIDEO",
    yxAccid: string
}
export interface SendGiftData {
    diamondNum: number
}
export interface RejectSendGiftOpt {
    anchorYxAccid: string,
    giftId: number
}