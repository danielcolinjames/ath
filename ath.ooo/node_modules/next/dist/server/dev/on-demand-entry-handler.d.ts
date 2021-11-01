import type { webpack5 as webpack } from 'next/dist/compiled/webpack/webpack';
import type ws from 'ws';
export declare const ADDED: unique symbol;
export declare const BUILDING: unique symbol;
export declare const BUILT: unique symbol;
export declare let entries: {
    [page: string]: {
        bundlePath: string;
        absolutePagePath: string;
        status?: typeof ADDED | typeof BUILDING | typeof BUILT;
        lastActiveTime?: number;
        dispose?: boolean;
    };
};
export default function onDemandEntryHandler(watcher: any, multiCompiler: webpack.MultiCompiler, { pagesDir, pageExtensions, maxInactiveAge, pagesBufferLength, }: {
    pagesDir: string;
    pageExtensions: string[];
    maxInactiveAge: number;
    pagesBufferLength: number;
}): {
    ensurePage(page: string, clientOnly: boolean): Promise<void | [void, void]>;
    onHMR(client: ws): void;
};
