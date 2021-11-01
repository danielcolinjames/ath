export interface Callback<T> {
    (err?: Error, result?: T): void;
}
export declare type Resolvable<T> = T | Promise<T>;
export interface IndexedObject {
    [key: string]: any;
}
export declare class Defer<R> {
    resolve: (thenableOrResult: R | Promise<R>) => void;
    reject: (error: any) => void;
    promise: Promise<R>;
    constructor();
}
export declare function defer<R>(): Defer<R>;
