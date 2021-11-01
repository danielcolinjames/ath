import { Vec3 } from '@vibrant/color';
import { Pixels } from '@vibrant/image';
import Histogram from '@vibrant/image/lib/histogram';
export interface Dimension {
    r1: number;
    r2: number;
    g1: number;
    g2: number;
    b1: number;
    b2: number;
    [d: string]: number;
}
export default class VBox {
    histogram: Histogram;
    static build(pixels: Pixels): VBox;
    dimension: Dimension;
    private _volume;
    private _avg;
    private _count;
    constructor(r1: number, r2: number, g1: number, g2: number, b1: number, b2: number, histogram: Histogram);
    invalidate(): void;
    volume(): number;
    count(): number;
    clone(): VBox;
    avg(): Vec3;
    contains(rgb: Vec3): boolean;
    split(): VBox[];
}
