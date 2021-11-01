import { Resolvable } from '@vibrant/types';
export default function runInWorker<R>(self: Window, fn: (...args: any[]) => Resolvable<R>): void;
