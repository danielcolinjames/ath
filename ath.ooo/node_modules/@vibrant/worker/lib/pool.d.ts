import { TaskWorkerClass } from './';
export default class WorkerPool {
    WorkerClass: TaskWorkerClass;
    private _taskId;
    private _workers;
    private _queue;
    private _executing;
    constructor(WorkerClass: TaskWorkerClass);
    private _findIdleWorker;
    private _enqueue;
    private _tryDequeue;
    private _onMessage;
    invoke<R>(args: any[], transferList?: any[]): Promise<R>;
}
