import { withCache } from '../src/withCache';

const func1 = async (x :number) => {
    console.log('func1 invoked with x =', x)
    return x * 2;
}

(async () => {
    const f1 = withCache(func1, (x) => `${x}`, 100);
    const ops = [];
    for(let i = 0; i < 100; i++) {
        ops.push(f1(10));
    }

    for(let i = 0; i < 100; i++) {
        ops.push(f1(20));
    }

    const rt = await Promise.all(ops)
    console.log('rt.length:', rt.length)
})()

