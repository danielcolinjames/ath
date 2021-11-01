import { Options } from './options';
import { Callback } from '@vibrant/types';
import { ImageSource } from '@vibrant/image';
import { Palette } from '@vibrant/color';
import Builder from './builder';
import { Pipeline, ProcessResult } from './pipeline';
export interface VibrantStatic {
    from(src: ImageSource): Builder;
}
export default class Vibrant {
    private _src;
    private _result;
    private static _pipeline;
    static use(pipeline: Pipeline): void;
    static DefaultOpts: Partial<Options>;
    static from(src: ImageSource): Builder;
    get result(): ProcessResult;
    opts: Options;
    constructor(_src: ImageSource, opts?: Partial<Options>);
    private _process;
    palette(): Palette;
    swatches(): Palette;
    getPalette(name: string, cb?: Callback<Palette>): Promise<Palette>;
    getPalette(cb?: Callback<Palette>): Promise<Palette>;
    getPalettes(names: string[], cb?: Callback<Palette>): Promise<{
        [name: string]: Palette;
    }>;
    getPalettes(cb?: Callback<Palette>): Promise<{
        [name: string]: Palette;
    }>;
}
