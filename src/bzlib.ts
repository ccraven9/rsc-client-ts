import { Buffer } from "buffer";
import { Bzip2 } from "@ledgerhq/compressjs";
// BZ is a magic symbol, h is for huffman and 1 is the level of compression (
// from 1-9)
export class BZLib {
    private static readonly BZIP_HEADER = Buffer.from('BZh1'.split('').map((c) => c.charCodeAt(0)));

    static decompress(fileData: Int8Array, archiveSize: number, archiveData: Buffer, fileSizeCompressed: number, offset: number) {
        const compressed = Buffer.from(
            archiveData.slice(offset, fileSizeCompressed + offset)
        );

        const decompressed = Bzip2.decompressFile(
            Buffer.concat([this.BZIP_HEADER, compressed])
        );

        fileData.set(decompressed);
    }
}


