import { np } from '../src/np';

describe('np should', () => {
    it('be able to get the resolved data', async () => {
        const p = Promise.resolve('foo');

        const r = await np(p);

        expect(r.error).toBeUndefined();
        expect(r.data).toEqual('foo');
    });

    it('be able to get the rejected reason', async () => {
        const p = Promise.reject('bar');

        const r = await np(p);

        expect(r.data).toBeUndefined();
        expect(r.error).toEqual('bar');
    });
});
