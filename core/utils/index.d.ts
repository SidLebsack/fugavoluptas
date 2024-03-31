/// <reference types="node" />
export declare function hexToByteArray(hexBytes: string): number[];
export declare function HexToBytes(hex: string): number[];
export declare function hexToBuffer(hex: string): Uint8Array;
export declare function bufferToHex(buffer: ArrayBuffer | ArrayLike<number> | Uint8Array): string;
export declare function hexStringToBytes(hexString: string): any[];
export declare function byteArrayToHex(arr: ArrayBuffer | ArrayLike<number> | Uint8Array): string;
export declare function BytesToHex(bytes: Uint8Array | ArrayBuffer | ArrayLike<number>): string;
export declare function reverseHex(hex: string): string;
export declare function getDifficulty(transactionHash: string): number;
export declare function decodeBase16(hex: string): string;
export declare function encodeBase16(str: string): string;
export declare function uint8ArrayToString(array: Uint8Array): string;
export declare function uint8ArrayToStringDefault(array: Uint8Array): string;
export declare function uint8ArrayToNumberArray(array: Uint8Array): number[];
export declare function stringToUint8Array(str: string): Uint8Array;
export declare function hexStringToUint8Array(str: string): Uint8Array;
export declare function arrayNumberToUint8Array(arr: number[]): Uint8Array;
export declare function uint8ArrayToBytes(array: Uint8Array): number[];
export declare function uint8ArrayToHex(arr: Uint8Array): string;
export declare function numberToByteArray(num: number, size?: number): Uint8Array;
export declare function bigIntToByteArray(bigint: bigint): Uint8Array;
export declare const hex2ascii: (hexx: any) => string;
export declare const Int2Buffer: (i: number) => Buffer;
//# sourceMappingURL=index.d.ts.map