import { ISerializable } from "../interfaces";
import { Address, PBinaryWriter, Timestamp } from "../types";
import { Opcode } from "./Opcode";
import { VMObject } from "./VMObject";
import { VMType } from "./VMType";
type byte = number;
export declare class ScriptBuilder {
    _labelLocations: {
        [id: string]: number;
    };
    _jumpLocations: {
        [id: number]: string;
    };
    str: string;
    writer: PBinaryWriter;
    NullAddress: string;
    static ScriptBuilder(): ScriptBuilder;
    constructor();
    BeginScript(): this;
    GetScript(): string;
    EndScript(): string;
    Emit(opcode: Opcode, bytes?: number[]): this;
    EmitThorw(reg: byte): this;
    EmitPush(reg: byte): this;
    EmitPop(reg: byte): this;
    EmitExtCall(method: string, reg?: byte): this;
    EmitBigInteger(value: string): this;
    EmitAddress(textAddress: string): this;
    RawString(value: string): any[];
    EmitLoad(reg: number, obj: any): this;
    EmitLoadBytes(reg: number, bytes: byte[], type?: VMType): this;
    EmitLoadArray(reg: number, obj: any): this;
    EmitLoadISerializable(reg: number, obj: ISerializable): this;
    EmitLoadVMObject(reg: number, obj: VMObject): this;
    EmitLoadEnum(reg: number, enumVal: number): this;
    EmitLoadAddress(reg: number, obj: Address): this;
    EmitLoadTimestamp(reg: number, obj: Date | Timestamp): this;
    EmitLoadVarInt(reg: number, val: number): this;
    EmitMove(src_reg: number, dst_reg: number): this;
    EmitCopy(src_reg: number, dst_reg: number): this;
    EmitLabel(label: string): this;
    EmitJump(opcode: Opcode, label: string, reg?: number): this;
    EmitCall(label: string, regCount: byte): this;
    EmitConditionalJump(opcode: Opcode, src_reg: byte, label: string): this;
    InsertMethodArgs(args: any[]): void;
    CallInterop(method: string, args: any[]): this;
    CallContract(contractName: string, method: string, args: any[]): this;
    AllowGas(from: string | Address, to: string | Address, gasPrice: number, gasLimit: number): this;
    SpendGas(address: string | Address): this;
    CallRPC<T>(methodName: string, params: any[]): Promise<T>;
    GetAddressTransactionCount(address: string, chainInput: string): Promise<number>;
    EmitTimestamp(obj: Date): this;
    EmitByteArray(bytes: number[]): this;
    EmitVarString(text: string): this;
    EmitVarInt(value: number): this;
    EmitUInt32(value: number): this;
    EmitBytes(bytes: byte[]): this;
    ByteToHex(byte: number): string;
    AppendByte(byte: number): void;
    AppendBytes(bytes: byte[]): void;
    AppendUshort(ushort: number): void;
    AppendHexEncoded(bytes: string): this;
}
export {};
//# sourceMappingURL=ScriptBuilder.d.ts.map