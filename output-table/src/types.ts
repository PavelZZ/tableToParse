import type data from './db.json'

export type TDataToParse = typeof data

export type DataIndex = keyof TDataToParse['users'][number]
export type TDataType = TDataToParse['users'][number]