type AsyncFunction = (...args: any[]) => Promise<any>;
type ResolveType<T> = T extends (...args: any[]) => Promise<infer R> ? R : any;
type GetKeyFunction<T extends AsyncFunction> = (...args: Parameters<T>) => string;

function withCache<T extends AsyncFunction>(
    asyncFunc: T,
    getKey: GetKeyFunction<T>,
    durationMs: number,
): (...args: Parameters<T>) => Promise<ResolveType<T>> {
    const cache = new Map<string, Promise<ResolveType<T>>>();
    const func = (...args: Parameters<T>): Promise<ResolveType<T>> => {
        const key = getKey(...args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const p = asyncFunc(...args)
            .then((data) => {
                setTimeout(() => {
                    cache.delete(key);
                }, durationMs);
                return data;
            })
            .catch((err) => {
                cache.delete(key);
                throw err;
            });

        cache.set(key, p);

        return p;
    };

    return func;
}

export { ResolveType, AsyncFunction, GetKeyFunction, withCache };
