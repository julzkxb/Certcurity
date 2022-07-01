const NodeRSA = require('node-rsa');

//const key = new NodeRSA({ b: 1024 });

const publicKey = new NodeRSA('-----BEGIN PUBLIC KEY-----\n' +
'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAma0vJ2FzlKJ2URKYGpb5\n' +
'olAfVYnOya4cUrBpJ2cxRAusJ8CJUkgoZxe/KrgZu4ci0RGmIU40MEKvWcraSf1O\n' +
'La9BWjJhYWyLZnybBUaPvxU58k7iDCmVuy3Nkk04Z9XvcpXt9bPMhIPCE9hBZWn/\n' +
'ym5FfKpiNO5heOjwmzf39Ap1yrDXWR1wV+JkDOtQZedJNis/YNMNaiPIs0gWVy0V\n' +
'mf60aANLIsouuqdPLUtjX20g/146L2gtoaLgOZRleBm1QlisPvZee8NP0CVVt7i9\n' +
'W9sMXOU/4YLWzYD5yD+vl4pLWvCbFPMgV+swp7gtwZ+MrwZAJxrIjjDjRqHM5pTL\n' +
'UwIDAQAB\n' +
'-----END PUBLIC KEY-----');

const privateKey = new NodeRSA('-----BEGIN PRIVATE KEY-----\n' +
'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCZrS8nYXOUonZR\n' +
'EpgalvmiUB9Vic7JrhxSsGknZzFEC6wnwIlSSChnF78quBm7hyLREaYhTjQwQq9Z\n' +
'ytpJ/U4tr0FaMmFhbItmfJsFRo+/FTnyTuIMKZW7Lc2STThn1e9yle31s8yEg8IT\n' +
'2EFlaf/KbkV8qmI07mF46PCbN/f0CnXKsNdZHXBX4mQM61Bl50k2Kz9g0w1qI8iz\n' +
'SBZXLRWZ/rRoA0siyi66p08tS2NfbSD/XjovaC2houA5lGV4GbVCWKw+9l57w0/Q\n' +
'JVW3uL1b2wxc5T/hgtbNgPnIP6+Xikta8JsU8yBX6zCnuC3Bn4yvBkAnGsiOMONG\n' +
'oczmlMtTAgMBAAECggEALHfksSyN2XC5c/RBd1BApCszJflekRWEtJi/lNtTcjE+\n' +
'e7JHCjw/FLXWZ3ImYBFWjdDhlbmfeGeTfhQo3kgiGy4fZw41B4/1No7P/NLSPaTS\n' +
'w773wjU2UpeKaM9XhxRs2WdxGCwS/jVyL3PgWIw3rEgEa3KSQGbKZcZh+UhUw5Tg\n' +
'fFsnZZGi4gSPcJkrgh5Z/epgXGOEsEvslKsUuqhf4RpPst+4lGFTvhq4Y9yAWkjJ\n' +
'GvoLexsa5piUWtTYNq6Gtxg98WQnkmBPvXprqzXS4iBvuAMqriOfkZuaM+qu4KXo\n' +
'R4oEn+9ZudtzGhc3kyDCbmZjDodPmQc0dNMg8a+SwQKBgQDD2476fKNkVcMUdqyc\n' +
'eGBi9IQJgaW2K6AV6PepHHrDElvIM0rAXgRvHcgKGbUM9jrRa/Ku5uSnXVk7dMZj\n' +
'iVhLN5DaWLaxpVUYV1javjCjRfXsAapsRiwXEwFWW+5pCH7nr6F5JBFxmKEFHgnh\n' +
'WIbZzpci4K+uEz+Rg4bAA3zBSwKBgQDI3cAF/0p4K0aMDEY0/Yn5zL6dSvT0DdrW\n' +
'eW5gTO7Dy7J2h8ayWNxRTfL/w3GQCstYwjFo+sbwkGBj+vKTka5/FD59zdBR+vz0\n' +
'0LsT7SVryKJqRbM0IslOwAR5QgadLdbWcob2m+P7aB9kNsOa1ip/KKvJkTnv+uC4\n' +
'5WY+janhGQKBgE4axZbgk2wUw1nqxYUUgCOWLP15hTLzjMCQCguXfuFB9fYNdlbm\n' +
'Z1BEiRx2CfxkSSpwqPPUwgR4Nnh+ZgsVn29Hdm2MiTaonxm444c/5zeFU7/NHkBV\n' +
'b4m4G4Vr3dRm/ey43mTn3Ej3u+bFht0lp4k+WIkhHw4FQQlvcRIrkdmnAoGBALJv\n' +
'44SwXAxSjVIeGUQ7sxV44CBFFUO1ByGeMAJWdYjz7G7FgSqwK9ACSgsRKVIHdMs9\n' +
'f709gfr0ltxacqHLOdNkPXtumVAqggpNXtN9yM9uJXH4xxBakrBlfdPmZo+8x+wr\n' +
'Q1/R7n5I6hIRYEStWoUpsSnX3Dsmh/lYuDJ7kF0JAoGAKK2cbHJdzYDyCnWBlnJM\n' +
'E5Qo0jHAhExuqerFpgowPIaleyUAal8s0Rj52XmOKQohxnyw6yTatA6Z/qjxgIAq\n' +
'uuhENYv3YIM5USaJEgl6OtTFLBhkF5eHiv+qXyjLFPTeuoupeOSnVo10zwzbDvF4\n' +
'KODYrimcZWXAkMpfyEDrGYI=\n' +
'-----END PRIVATE KEY-----');

//let publicKey = new NodeRSA(public_key);
//let privateKey = new NodeRSA(private_key);

var keyStorageMethods = {


    keyEncryption: function(keySecret) {
        var t7 = performance.now();
        var encryptedToString = publicKey.encrypt(keySecret);
        var t8 = performance.now();
        console.log('Key encrypted in: '+ (t8-t7) +' milliseconds')
        console.log('Key encrypted: ' + encryptedToString);
        return encryptedToString;
    },

    keyDecryption: function(keyEncrypted) {
        var t9 = performance.now();
        var decryptedToString = privateKey.decrypt(keyEncrypted);
        var t10 = performance.now();
        console.log('Key decrypted in: '+ (t10-t9) +' milliseconds')
        //console.log('Key decrypted: ' + decryptedToString);
        return decryptedToString;
    }
}

export default keyStorageMethods;