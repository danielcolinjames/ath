import WorkerPool from './pool';
export interface TaskWorker extends Worker {
    id: number;
    idle: boolean;
}
export interface TaskWorkerClass {
    new (): TaskWorker;
}
export default class WorkerManager {
    private _pools;
    register(name: string, WorkerClass: TaskWorkerClass): void;
    hasWorker(name: string): boolean;
    getWorker(name: string): WorkerPool;
    invokeWorker<R>(name: string, args: any[], transferList?: any[]): Promise<R>;
}
