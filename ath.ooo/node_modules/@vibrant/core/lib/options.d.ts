import { ImageClass, ImageOptions } from '@vibrant/image';
import { QuantizerOptions } from '@vibrant/quantizer';
import { StageOptions, ProcessOptions } from './pipeline';
export interface Options extends ImageOptions, QuantizerOptions {
    useWorker: boolean;
    ImageClass: ImageClass;
    quantizer: string | StageOptions;
    generators: (string | StageOptions)[];
    filters: string[];
}
export declare function buildProcessOptions(opts: Options, override?: Partial<ProcessOptions>): ProcessOptions;
