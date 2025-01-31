export type TErrorSource = {
    path: string | number,
    message: string
}[];

export type TGenericsErrorResponse = {
    statusCode: number,
    message: string,
    errorSource: TErrorSource
}