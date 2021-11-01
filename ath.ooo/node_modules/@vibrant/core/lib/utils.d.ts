export declare function mapValues<T, R>(o: {
    [key: string]: T;
}, mapper: (v: T) => R): {
    [key: string]: R;
};
/**
 * Overwrite values or properties on objects and lists recursively.
 * A shallow copy will be created for each array value.
 */
export declare function assignDeep<T>(target: Partial<T>, ...sources: (Partial<T> | undefined)[]): T;
