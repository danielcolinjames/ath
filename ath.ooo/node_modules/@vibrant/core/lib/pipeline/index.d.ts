import { ImageData } from '@vibrant/image';
import { Quantizer } from '@vibrant/quantizer';
import { Generator } from '@vibrant/generator';
import { Palette, Swatch, Filter } from '@vibrant/color';
export declare class Stage<T> {
    protected pipeline: BasicPipeline;
    private _map;
    constructor(pipeline: BasicPipeline);
    names(): string[];
    has(name: string): boolean;
    get(name: string): T;
    register(name: string, stageFn: T): BasicPipeline;
}
export interface ProcessResult {
    colors: Swatch[];
    palettes: {
        [name: string]: Palette;
    };
}
export interface StageOptions {
    name: string;
    options?: any;
}
export interface ProcessOptions {
    filters: string[];
    quantizer: string | StageOptions;
    generators: (string | StageOptions)[];
}
export interface Pipeline {
    process(imageData: ImageData, opts: ProcessOptions): Promise<ProcessResult>;
}
export declare class BasicPipeline implements Pipeline {
    private _buildProcessTasks;
    filter: Stage<Filter>;
    quantizer: Stage<Quantizer>;
    generator: Stage<Generator>;
    process(imageData: ImageData, opts: ProcessOptions): Promise<ProcessResult>;
    private _filterColors;
    private _generateColors;
    private _generatePalettes;
}
