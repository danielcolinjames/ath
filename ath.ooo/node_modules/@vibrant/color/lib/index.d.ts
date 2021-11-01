export interface Filter {
    (red: number, green: number, blue: number, alpha: number): boolean;
}
/**
 * 3d floating pointer vector
 */
export declare type Vec3 = [number, number, number];
/**
 * The layout for a node-vibrant Palette. Allows you to keep track of
 */
export interface Palette {
    Vibrant: Swatch | null;
    Muted: Swatch | null;
    DarkVibrant: Swatch | null;
    DarkMuted: Swatch | null;
    LightVibrant: Swatch | null;
    LightMuted: Swatch | null;
    [name: string]: Swatch | null;
}
export declare class Swatch {
    static applyFilters(colors: Swatch[], filters: Filter[]): Swatch[];
    /**
     * Make a value copy of a swatch based on a previous one. Returns a new Swatch instance
     * @param {Swatch} swatch
     */
    static clone(swatch: Swatch): Swatch;
    private _hsl;
    private _rgb;
    private _yiq;
    private _population;
    private _hex;
    /**
     * The red value in the RGB value
     */
    get r(): number;
    /**
     * The green value in the RGB value
     */
    get g(): number;
    /**
     * The blue value in the RGB value
     */
    get b(): number;
    /**
     * The color value as a rgb value
     */
    get rgb(): Vec3;
    /**
     * The color value as a hsl value
     */
    get hsl(): Vec3;
    /**
     * The color value as a hex string
     */
    get hex(): string;
    get population(): number;
    /**
     * Get the JSON object for the swatch
     */
    toJSON(): {
        rgb: Vec3;
        population: number;
    };
    /**
     * Get the color value as a rgb value
     * @deprecated Use property instead
     */
    getRgb(): Vec3;
    /**
     * Get the color value as a hsl value
     * @deprecated Use property instead
     */
    getHsl(): Vec3;
    /**
     * @deprecated Use property instead
     */
    getPopulation(): number;
    /**
     * Get the color value as a hex string
     * @deprecated Use property instead
     */
    getHex(): string;
    private getYiq;
    private _titleTextColor;
    private _bodyTextColor;
    get titleTextColor(): string;
    get bodyTextColor(): string;
    getTitleTextColor(): string;
    getBodyTextColor(): string;
    constructor(rgb: Vec3, population: number);
}
