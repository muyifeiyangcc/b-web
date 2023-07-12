export interface Result<T = any> {
    code: string,
    message: string,
    result: T
}