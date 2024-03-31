export function hexToByteArray(hexBytes: string) {
  const res = [hexBytes.length / 2];
  for (let i = 0; i < hexBytes.length; i += 2) {
    const hexdig = hexBytes.substr(i, 2);
    if (hexdig == '') {
      res.push(0);
    } else res.push(parseInt(hexdig, 16));
  }
  return res;
}

export function HexToBytes(hex: string) {
  return hexToByteArray(hex);
}

export function hexToBuffer(hex: string) {
  return new Uint8Array(hexToByteArray(hex));
}

export function bufferToHex(buffer: ArrayBuffer | ArrayLike<number> | Uint8Array) {
  return byteArrayToHex(buffer);
}

export function hexStringToBytes(hexString: string) {
  for (var bytes = [], c = 0; c < hexString.length; c += 2)
    bytes.push(parseInt(hexString.substr(c, 2), 16));
  return bytes;
}

export function byteArrayToHex(arr: ArrayBuffer | ArrayLike<number> | Uint8Array): string {
  if (typeof arr !== 'object') {
    throw new Error(`ba2hex expects an array.Input was ${arr}`);
  }
  let result = '';
  const intArray = new Uint8Array(arr);
  for (const i of intArray) {
    let str = i.toString(16);
    str = str.length === 0 ? '00' : str.length === 1 ? '0' + str : str;
    result += str;
  }
  return result;
}

export function BytesToHex(bytes: Uint8Array | ArrayBuffer | ArrayLike<number>) {
  return byteArrayToHex(bytes);
}

export function reverseHex(hex: string): string {
  let out = '';
  for (let i = hex.length - 2; i >= 0; i -= 2) {
    out += hex.substr(i, 2);
  }
  return out;
}

export function getDifficulty(transactionHash: string) {
  let bytes = hexStringToBytes(transactionHash).reverse();
  let result = 0;

  for (let i = 0; i < bytes.length; i++) {
    var n = bytes[i];
    for (let j = 0; j < 8; j++) {
      if ((bytes[i] & (1 << j)) != 0) {
        result = 1 + (i << 3) + j;
      }
    }
  }

  return 256 - result;
}

export function decodeBase16(hex: string) {
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

export function encodeBase16(str: string) {
  return str
    .split('')
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}

export function uint8ArrayToString(array: Uint8Array): string {
  let result = '';
  for (let i = 0; i < array.length; i++) {
    result += String.fromCharCode(array[i]);
  }
  return result;
}

export function uint8ArrayToStringDefault(array: Uint8Array): string {
  let result = '';
  for (let i = 0; i < array.length; i++) {
    result += array[i].toString(16);
  }
  return result;
}

export function uint8ArrayToNumberArray(array: Uint8Array): number[] {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(array[i]);
  }
  return result;
}

export function stringToUint8Array(str: string): Uint8Array {
  let result = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    result[i] = str.charCodeAt(i);
  }
  return result;
}

export function hexStringToUint8Array(str: string): Uint8Array {
  let result = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    result[i] = str.charCodeAt(i).toString(16).charCodeAt(0);
  }
  return result;
}

export function arrayNumberToUint8Array(arr: number[]): Uint8Array {
  let result = new Uint8Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    result[i] = arr[i];
  }
  return result;
}

export function uint8ArrayToBytes(array: Uint8Array): number[] {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(array[i]);
  }
  return result;
}

export function uint8ArrayToHex(arr: Uint8Array): string {
  let hexString = '';
  for (let i = 0; i < arr.length; i++) {
    hexString += arr[i].toString(16).padStart(2, '0');
  }
  return hexString;
}

export function numberToByteArray(num: number, size?: number): Uint8Array {
  if (size === undefined) {
    if (num < 0xfd) {
      size = 1;
    } else if (num <= 0xfffd) {
      size = 2;
    } else if (num <= 0xffffd) {
      size = 3;
    } else if (num <= 0xfffffffd) {
      size = 4;
    } else if (num <= 0xffffffff) {
      size = 5;
    } else if (num <= 0xffffffffffffffff) {
      size = 9;
    }
  }
  var bytes = new Uint8Array(size);

  var i = 0;
  do {
    bytes[i++] = num & 0xff;
    num = num >> 8;
  } while (num);
  return bytes;
}

export function bigIntToByteArray(bigint: bigint): Uint8Array {
  // Get a big-endian byte representation of the bigint
  var bytes = bigint.toString(16).padStart(64, '0');
  var byteArray = new Uint8Array(bytes.length / 2);
  for (var i = 0; i < bytes.length; i += 2) {
    byteArray[i / 2] = parseInt(bytes.substring(i, i + 2), 16);
  }
  return byteArray;
}

export const hex2ascii = (hexx) => {
  const hex = hexx.toString();
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    const char = hex.substr(i, 2);
    const charCode = String.fromCharCode(parseInt(char, 16));
    // console.log('char', char, 'charCode', charCode);
    str += charCode;
  }
  return str;
};

export const Int2Buffer = (i: number): Buffer => {
  let hex = i.toString(16).toUpperCase();
  if (hex.length % 2 === 1) {
    hex = '0' + hex;
  }
  return Buffer.from(hex, 'hex');
};
