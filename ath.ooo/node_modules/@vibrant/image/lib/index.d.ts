/// <reference types="node" />
import { Callback } from '@vibrant/types';
import { Filter } from '@vibrant/color';
export declare type ImageCallback = Callback<Image>;
export declare type ImageSource = string | HTMLImageElement | Buffer;
export declare type Pixels = Uint8ClampedArray | Buffer;
export interface ImageData {
    data: Pixels;
    width: number;
    height: number;
}
export interface ImageOptions {
    quality: number;
    maxDimension: number;
}
export interface Image {
    load(image: ImageSource): Promise<Image>;
    clear(): void;
    update(imageData: ImageData): void;
    getWidth(): number;
    getHeight(): number;
    resize(targetWidth: number, targetHeight: number, ratio: number): void;
    getPixelCount(): number;
    getImageData(): ImageData;
    remove(): void;
    scaleDown(opts: ImageOptions): void;
}
export interface ImageClass {
    new (): Image;
}
export declare abstract class ImageBase implements Image {
    abstract load(image: ImageSource): Promise<ImageBase>;
    abstract clear(): void;
    abstract update(imageData: ImageData): void;
    abstract getWidth(): number;
    abstract getHeight(): number;
    abstract resize(targetWidth: number, targetHeight: number, ratio: number): void;
    abstract getPixelCount(): number;
    abstract getImageData(): ImageData;
    abstract remove(): void;
    scaleDown(opts: ImageOptions): void;
}
export declare function applyFilters(imageData: ImageData, filters: Filter[]): ImageData;
