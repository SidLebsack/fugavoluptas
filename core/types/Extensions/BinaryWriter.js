"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PBinaryWriter = exports.Example = void 0;
//import { BinaryWriter, BinaryReader, Encoding } from "csharp-binary-stream";
var csharp_binary_stream_1 = require("csharp-binary-stream");
/*BinaryWriter.prototype.appendByte = function (value: number): this {};

/*

Object.defineProperty(
  BinaryWriter,
  "appendByte",
  (value: number): BinaryWriter => {
    (this as unknown as BinaryWriter).writeByte(value);
    return this as unknown as BinaryWriter;
  }
);

BinaryWriter.prototype.writeBytes = function (bytes: number[]): this {
  for (let i = 0; i < bytes.length; i++) this.appendByte(bytes[i]);
  return this;
};
*/
var Example = /** @class */ (function (_super) {
    __extends(Example, _super);
    function Example(arg1) {
        return _super.call(this, arg1) || this;
    }
    Example.prototype.appendByte = function (value) {
        this.writeByte(value);
        return this;
    };
    return Example;
}(csharp_binary_stream_1.BinaryWriter));
exports.Example = Example;
var PBinaryWriter = /** @class */ (function (_super) {
    __extends(PBinaryWriter, _super);
    function PBinaryWriter(arg1) {
        return _super.call(this, arg1) || this;
    }
    PBinaryWriter.prototype.appendByte = function (value) {
        _super.prototype.writeByte.call(this, value);
        return this;
    };
    PBinaryWriter.prototype.appendBytes = function (bytes) {
        for (var i = 0; i < bytes.length; i++) {
            this.appendByte(bytes[i]);
        }
    };
    PBinaryWriter.prototype.writeBytes = function (bytes) {
        for (var i = 0; i < bytes.length; i++)
            this.appendByte(bytes[i]);
        // writer.Write(bytes);
        return this;
    };
    PBinaryWriter.prototype.writeVarInt = function (value) {
        if (value < 0)
            throw "negative value invalid";
        if (value < 0xfd) {
            this.appendByte(value);
        }
        else if (value <= 0xffff) {
            var B = (value & 0x0000ff00) >> 8;
            var A = value & 0x000000ff;
            // TODO check if the endianess is correct, might have to reverse order of appends
            this.appendByte(0xfd);
            this.appendByte(A);
            this.appendByte(B);
        }
        else if (value <= 0xffffffff) {
            var C = (value & 0x00ff0000) >> 16;
            var B = (value & 0x0000ff00) >> 8;
            var A = value & 0x000000ff;
            // TODO check if the endianess is correct, might have to reverse order of appends
            this.appendByte(0xfe);
            this.appendByte(A);
            this.appendByte(B);
            this.appendByte(C);
        }
        else {
            var D = (value & 0xff000000) >> 24;
            var C = (value & 0x00ff0000) >> 16;
            var B = (value & 0x0000ff00) >> 8;
            var A = value & 0x000000ff;
            // TODO check if the endianess is correct, might have to reverse order of appends
            this.appendByte(0xff);
            this.appendByte(A);
            this.appendByte(B);
            this.appendByte(C);
            this.appendByte(D);
        }
        return this;
    };
    PBinaryWriter.prototype.writeTimestamp = function (obj) {
        var num = obj.value;
        var a = (num & 0xff000000) >> 24;
        var b = (num & 0x00ff0000) >> 16;
        var c = (num & 0x0000ff00) >> 8;
        var d = num & 0x000000ff;
        var bytes = [d, c, b, a];
        this.appendBytes(bytes);
        return this;
    };
    PBinaryWriter.prototype.writeDateTime = function (obj) {
        var num = (obj.getTime() + obj.getTimezoneOffset() * 60 * 1000) / 1000;
        var a = (num & 0xff000000) >> 24;
        var b = (num & 0x00ff0000) >> 16;
        var c = (num & 0x0000ff00) >> 8;
        var d = num & 0x000000ff;
        var bytes = [d, c, b, a];
        this.appendBytes(bytes);
        return this;
    };
    PBinaryWriter.prototype.rawString = function (value) {
        var data = [];
        for (var i = 0; i < value.length; i++) {
            data.push(value.charCodeAt(i));
        }
        return data;
    };
    PBinaryWriter.prototype.writeByteArray = function (bytes) {
        this.writeVarInt(bytes.length);
        this.writeBytes(bytes);
        return this;
    };
    PBinaryWriter.prototype.writeString = function (text) {
        var bytes = this.rawString(text);
        this.writeVarInt(bytes.length);
        this.writeBytes(bytes);
        return this;
    };
    PBinaryWriter.prototype.emitUInt32 = function (value) {
        if (value < 0)
            throw "negative value invalid";
        var D = (value & 0xff000000) >> 24;
        var C = (value & 0x00ff0000) >> 16;
        var B = (value & 0x0000ff00) >> 8;
        var A = value & 0x000000ff;
        // TODO check if the endianess is correct, might have to reverse order of appends
        this.appendByte(0xff);
        this.appendByte(A);
        this.appendByte(B);
        this.appendByte(C);
        this.appendByte(D);
        return this;
    };
    PBinaryWriter.prototype.writeBigInteger = function (value) {
        return this.writeBigIntegerString(value.toString());
    };
    PBinaryWriter.prototype.writeBigIntegerString = function (value) {
        var bytes = [];
        if (value == "0") {
            bytes = [0];
        }
        else if (value.startsWith("-1")) {
            throw new Error("Unsigned bigint serialization not suppoted");
        }
        else {
            var hex = BigInt(value).toString(16);
            if (hex.length % 2)
                hex = "0" + hex;
            var len = hex.length / 2;
            var i = 0;
            var j = 0;
            while (i < len) {
                bytes.unshift(parseInt(hex.slice(j, j + 2), 16)); // little endian
                i += 1;
                j += 2;
            }
            bytes.push(0); // add sign at the end
        }
        return this.writeByteArray(bytes);
    };
    return PBinaryWriter;
}(csharp_binary_stream_1.BinaryWriter));
exports.PBinaryWriter = PBinaryWriter;
