declare module "@ledgerhq/compressjs" {
    export interface CompressionAlgorithm {
        compressFile(data: Uint8Array | number[]): Uint8Array;
        decompressFile(data: Uint8Array | number[]): Uint8Array;
    }

    export const Bzip2: CompressionAlgorithm;
}