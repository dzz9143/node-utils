import { np } from '../src/np'

const p1 = Promise.resolve(100);
const p2 = Promise.resolve({
    msg: 'hello world'
});
const p3 = Promise.reject(new Error('something is wrong'));

const asyncFunc1 = async () => {
    return "hello world"
}
 
(async () => {
    const r1 = await np(p1);
    if (r1.error) {
        console.error('error:', r1.error);
    } else {
        console.log('data:', r1.data);
    }

    const r2 = await np(p2);
    if (r2.error) {
        console.error('error:', r2.error);
    } else {
        console.log('data:', r2.data);
    }

    const r3 = await np(p3);
    if (r3.error) {
        console.error('error:', r3.error);
    } else {
        console.log('data:', r3.data);
    }

    const r4 = await np(asyncFunc1())
    if (r4.error) {
        console.error('error:', r4.error);
    } else {
        console.log('data:', r4.data);
    }
})()