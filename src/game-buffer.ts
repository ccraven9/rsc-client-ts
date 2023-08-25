
/**
 * Utility class designed to handle manipulation and serialization of binary data in the form of bytes, integers, strings, and arrays. 
 * It provides methods for writing various types of data into a pre-allocated Int8Array buffer and for reading data from that buffer.
 */
export class GameBuffer {

    buffer: Int8Array;
    offset: number;

    constructor(buffer: Int8Array) {
        this.buffer = buffer;
        this.offset = 0;
    }

    /**
     * Insert a byte value into the buffer at the current offset position.
     * @param byte - Byte value to be inserted. 
     */
    putByte(byte: number) {
        this.buffer[this.offset++] = byte;
    }

    /**
     * 
     * @param i - number
     */
    putInt(i: number) {
        /**
         * The >> operator is a bitwise right shift operator. It shifts the bits of the number to the right by the specified number of positions.
         * The offset variable keeps track of the current position within the buffer where the next byte should be stored.
         * After each byte is stored, the offset is incremented to ensure that subsequent bytes are placed in the correct positions.
         */
        this.buffer[this.offset++] = i >> 24;
        this.buffer[this.offset++] = i >> 16;
        this.buffer[this.offset++] = i >> 8;
        this.buffer[this.offset++] = i;
    }

    /**
     * 
     * @param s - string
     */
    putString(s: string) {
        for (let i = 0; i < s.length; i++) {
            this.buffer[this.offset++] = s.charCodeAt(i);
        }

        // null terminate
        this.buffer[this.offset++] = 10;
    }

    /**
     * 
     * @param src - source
     * @param srcPos - source position
     * @param len - length
     */
    putBytes(src: number[], srcPos: number, len: number) {
        for (let i = srcPos; i < len; i++) {
            this.buffer[this.offset++] = src[i];
        }
    }

    /**
     * 
     * @returns number
     */
    getUnsignedByte(): number {
        return this.buffer[this.offset++] & 0xff;
    }

    /**
     * 
     * @returns number
     */
    getUnsignedShort(): number {
        this.offset += 2;

        return (
            ((this.buffer[this.offset - 2] & 0xff) << 8) +
            (this.buffer[this.offset - 1] & 0xff)
        );
    }

    /**
     * 
     * @returns number
     */
    getUnsignedInt(): number {
        this.offset += 4;

        return (
            ((this.buffer[this.offset - 4] & 0xff) << 24) +
            ((this.buffer[this.offset - 3] & 0xff) << 16) +
            ((this.buffer[this.offset - 2] & 0xff) << 8) +
            (this.buffer[this.offset - 1] & 0xff)
        );
    }

    getBytes(dest: Int8Array, destPos: number, len: number) {
        for (let i = destPos; i < len; i++) {
            dest[destPos + i] = this.buffer[this.offset++];
        }
    }
}
