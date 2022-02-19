export type ErrorRequired = {code : string, message : string}
export type ErrorObject<T> = T & {[key : string] : unknown}

export interface CardProps { 
    close : () => void
}