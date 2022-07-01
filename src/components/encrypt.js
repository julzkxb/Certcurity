import hashStorage from './hashStorage'
import keyEncrypt from './keyEncrypt'
const CryptoJS = require("crypto-js");

//const passKeyword = CryptoJS.lib.WordArray.random(16);
const passFile = CryptoJS.lib.WordArray.random(16);
const salt = CryptoJS.lib.WordArray.random(16);
const iv = CryptoJS.lib.WordArray.random(16);

var t3 = performance.now()
const fileKey = CryptoJS.PBKDF2(passFile, salt, {
    keySize: 256 / 32
})
var t4 = performance.now()

var encCerts = [];

var cryptoMethods = {


    fileEncryption: function (fileBuffer) {

        var pf = CryptoJS.lib.WordArray.random(16);
        var s = CryptoJS.lib.WordArray.random(16);
        var key = CryptoJS.PBKDF2(pf, s, {
            keySize: 256 / 32
        })
        var iVector = CryptoJS.lib.WordArray.random(16);
        var toEncFile = CryptoJS.enc.Utf8.parse(fileBuffer);
        var t1 = performance.now();
        var encryptedFile = CryptoJS.AES.encrypt(toEncFile, fileKey, {
            iv: iv, //offset
            mode: CryptoJS.mode.CBC, //encryption mode
            padding: CryptoJS.pad.Pkcs7 //padding mode
        })

        var t2 = performance.now();
        console.log("Certificate encrypted in " + (t2 - t1)+ " milliseconds.")
        console.log("Key: "+ key)
        var encryptedKey = keyEncrypt.keyEncryption(encryptedFile.key);
        console.log("IV:" + iVector)
        hashStorage.storeKey(encryptedKey, iVector);
        var convEncFile = CryptoJS.enc.Utf8.parse(encryptedFile)
        return cryptoMethods.convertWordArrayToUint8Array(convEncFile);
    },

    keyEncFunc: function () {
        console.log("Key generation took "+ (t4-t3)+" milliseconds")
    },

    keyGenTime: function () {
        console.log("Key generation took "+ (t4-t3)+" milliseconds")
    },

    keyStorage: function () {
        return fileKey;
    },

    ivStorage: function () {
        return iv;
    },

    fileDecryption: function (fileCipher, encryptedKey, IV) {

        var decryptedKey = keyEncrypt.keyDecryption(encryptedKey);
        var t5 = performance.now()
        var ciphertextStr = CryptoJS.enc.Utf8.parse(fileCipher);
        var toDecFile = CryptoJS.enc.Base64.stringify (ciphertextStr);
        var decryptedFile = CryptoJS.AES.decrypt (toDecFile, fileKey, {
            iv: iv, //offset
            mode: CryptoJS.mode.CBC, //encryption mode
            padding: CryptoJS.pad.Pkcs7 //padding mode
        });
        var t6 = performance.now()
        //var decryptedFileString = decryptedFile.toString(CryptoJS.enc.Utf8);
        console.log("File decrypted in " + (t6-t5)+ " milliseconds");
        return decryptedFile;
    },

    convertWordArrayToUint8Array: function (wordArray) {
        var len = wordArray.words.length,
            u8_array = new Uint8Array(len << 2),
            offset = 0, word, i
        ;
        for (i=0; i<len; i++) {
            word = wordArray.words[i];
            u8_array[offset++] = word >> 24;
            u8_array[offset++] = (word >> 16) & 0xff;
            u8_array[offset++] = (word >> 8) & 0xff;
            u8_array[offset++] = word & 0xff;
        }
        return u8_array;
    },
}

export default cryptoMethods;
