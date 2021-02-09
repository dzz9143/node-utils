type AysncResult<T> = {
    data?: T;
    error?: any;
};

function np<T>(p: Promise<T>): Promise<AysncResult<T>> {
    return p
        .then((data) => {
            return {
                data,
            };
        })
        .catch((error) => {
            return {
                error,
            };
        });
}

export { np, AysncResult };
