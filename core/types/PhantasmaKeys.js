"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhantasmaKeys = void 0;
var Address_1 = require("./Address");
var bs58_1 = __importDefault(require("bs58"));
var wif_1 = __importDefault(require("wif"));
var utils_1 = require("../utils");
var Ed25519Signature_1 = require("./Ed25519Signature");
var elliptic_1 = __importDefault(require("elliptic"));
var Entropy_1 = require("./Entropy");
var tx_1 = require("../tx");
var eddsa = elliptic_1.default.eddsa;
var ed25519 = new eddsa("ed25519");
var PhantasmaKeys = /** @class */ (function () {
    function PhantasmaKeys(privateKey) {
        if (privateKey.length == 64) {
            privateKey = privateKey.slice(0, 32);
        }
        if (privateKey.length != PhantasmaKeys.PrivateKeyLength) {
            throw new Error("privateKey should have length ".concat(PhantasmaKeys.PrivateKeyLength, " but has ").concat(privateKey.length));
        }
        this._privateKey = new Uint8Array(PhantasmaKeys.PrivateKeyLength);
        this._privateKey.set(privateKey);
        var wif = (0, tx_1.getWifFromPrivateKey)((0, utils_1.uint8ArrayToHex)(privateKey));
        var privateKeyString = (0, utils_1.uint8ArrayToHex)(this._privateKey);
        var privateKeyBuffer = Buffer.from(privateKeyString, "hex");
        var publicKey = ed25519.keyFromSecret(privateKeyBuffer).getPublic();
        this._publicKey = publicKey;
        this.Address = Address_1.Address.FromKey(this);
    }
    Object.defineProperty(PhantasmaKeys.prototype, "PrivateKey", {
        get: function () {
            return this._privateKey;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PhantasmaKeys.prototype, "PublicKey", {
        get: function () {
            return this._publicKey;
        },
        enumerable: false,
        configurable: true
    });
    PhantasmaKeys.prototype.toString = function () {
        return this.Address.Text;
    };
    PhantasmaKeys.generate = function () {
        var privateKey = Entropy_1.Entropy.GetRandomBytes(PhantasmaKeys.PrivateKeyLength);
        var pair = new PhantasmaKeys(privateKey);
        return pair;
    };
    PhantasmaKeys.fromWIF = function (wif) {
        if (!wif) {
            throw new Error("WIF required");
        }
        var data = bs58_1.default.decode(wif); // checkdecode
        if (data.length == 38) {
            data = data.slice(0, 34);
        }
        if (data.length != 34 || data[0] != 0x80 || data[33] != 0x01) {
            throw new Error("Invalid WIF format");
        }
        var privateKey = data.slice(1, 33);
        return new PhantasmaKeys(privateKey);
    };
    PhantasmaKeys.prototype.toWIF = function () {
        var privateKeyString = (0, utils_1.uint8ArrayToHex)(this._privateKey);
        var privatekeyBuffer = Buffer.from(privateKeyString, "hex");
        var wif = wif_1.default.encode(128, privatekeyBuffer, true); //uint8ArrayToHex(data); // .base58CheckEncode();
        return wif;
    };
    PhantasmaKeys.xor = function (x, y) {
        if (x.length != y.length) {
            throw new Error("x and y should have the same length");
        }
        var result = new Uint8Array(x.length);
        for (var i = 0; i < x.length; i++) {
            result[i] = x[i] ^ y[i];
        }
        return result;
    };
    PhantasmaKeys.prototype.Sign = function (msg, customSignFunction) {
        return Ed25519Signature_1.Ed25519Signature.Generate(this, msg);
    };
    PhantasmaKeys.PrivateKeyLength = 32;
    return PhantasmaKeys;
}());
exports.PhantasmaKeys = PhantasmaKeys;
