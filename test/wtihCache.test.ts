import { withCache } from '../src/withCache';

jest.useFakeTimers();

describe('withCache should', () => {
    it('be able to get the cache promise returned by async function', async () => {
        const mockFunc = jest.fn().mockResolvedValue('foo');

        const cachedFunc = withCache(mockFunc, () => 'key', 1000);

        const ops = [];

        for (let i = 0; i < 100; i++) {
            ops.push(cachedFunc());
        }

        const rt1 = await Promise.all(ops);

        expect(rt1.length).toEqual(100);
        expect(mockFunc).toHaveBeenCalledTimes(1);

        jest.advanceTimersByTime(1000);
        expect(setTimeout).toBeCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

        // schedule another invocation
        const rt2 = await cachedFunc();
        expect(rt2).toEqual('foo');
        expect(mockFunc).toHaveBeenCalledTimes(2);
    });
});
