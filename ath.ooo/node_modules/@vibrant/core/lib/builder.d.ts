import { Options } from './options';
import { Callback } from '@vibrant/types';
import { ImageClass, ImageSource } from '@vibrant/image';
import { Palette } from '@vibrant/color';
import Vibrant from './';
export default class Builder {
    private _src;
    private _opts;
    constructor(src: ImageSource, opts?: Partial<Options>);
    maxColorCount(n: number): Builder;
    maxDimension(d: number): Builder;
    addFilter(name: string): Builder;
    removeFilter(name: string): Builder;
    clearFilters(): Builder;
    quality(q: number): Builder;
    useImageClass(imageClass: ImageClass): Builder;
    useGenerator(generator: string, options?: any): Builder;
    useQuantizer(quantizer: string, options?: any): Builder;
    build(): Vibrant;
    getPalette(cb?: Callback<Palette>): Promise<Palette>;
    getSwatches(cb?: Callback<Palette>): Promise<Palette>;
}
