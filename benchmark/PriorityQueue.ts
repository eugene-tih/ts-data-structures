import {PriorityQueue} from '../src/PriorityQueue/PriorityQueue';
import {performance} from 'perf_hooks';

/**
 * Measure the time of execution in milliseconds of a synchronous task
 */
function runBenchmark(toMeasure: Function, repeatTimes: number): {totalMilliseconds: number; averageMillisecondsPerTask: number} {
    const startTime: number = performance.now();
    let totalAttempts: number = 0;

    for (let i = 0; i < repeatTimes; i++) {
        const startTimeSubtask = performance.now();
        toMeasure();
        const endTimeSubtask = performance.now();

        totalAttempts += endTimeSubtask - startTimeSubtask;
    }

    const finalTime = performance.now();

    return {
        totalMilliseconds: finalTime - startTime,
        averageMillisecondsPerTask: totalAttempts / repeatTimes,
    };
}

const result = runBenchmark(() => {
    const myPriorityQueue = new PriorityQueue<number>();

    for (let i: number = 1000; i > 0; i -= 1) {
        myPriorityQueue.enqueue(i, i);
    }
}, 1);

const result1 = runBenchmark(() => {
    const myPriorityQueue = new PriorityQueue<number>();

    for (let i: number = 10000; i > 0; i -= 1) {
        myPriorityQueue.enqueue(i, i);
    }
}, 1);

const result2 = runBenchmark(() => {
    const myPriorityQueue = new PriorityQueue<number>();

    for (let i: number = 100000; i > 0; i -= 1) {
        myPriorityQueue.enqueue(i, i);
    }
}, 1);

console.log(result);
console.log(result1);
console.log(result2);
