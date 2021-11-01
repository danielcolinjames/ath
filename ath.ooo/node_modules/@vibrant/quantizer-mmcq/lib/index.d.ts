import { QuantizerOptions } from '@vibrant/quantizer';
import { Pixels } from '@vibrant/image';
import { Swatch } from '@vibrant/color';
declare const MMCQ: (pixels: Pixels, opts: QuantizerOptions) => Array<Swatch>;
export default MMCQ;
