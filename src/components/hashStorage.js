import cryptographicMod from './encrypt'
var storage = [];
var identifier = [];
var row = 0;
var certs = [];
var decryptCerts = [];
var key = [];
var iv = [];

var storageMethods = {

    storeHash : function(hash, studentID) {
        var t1 = performance.now();
        for (var i = 0; i < identifier.length; i++)
        {
            if(studentID == identifier[i])
            {
                alert('Student ID has another certificate assigned to it')
                return 0;
            }
        }
        storage[row] = hash;
        identifier[row] = studentID;
        console.table(storage);
        console.table(identifier);
        //row += 1;
        certs[i] = hash;
        localStorage.setItem("certs", JSON.stringify(certs));
        var t2 = performance.now();
        console.log("Certificate stored in " + (t2 - t1)+ " milliseconds.")
        //return storage;
    },

    decryptFile : function(hash) {
        decryptCerts[row] = hash;
        row ++;
        console.log(row);
    },
    
    showFile : function(i) {
        const anchor = document.createElement("a");
        anchor.href = 'https://ipfs.infura.io/ipfs/' + decryptCerts[i];
        anchor.download = decryptCerts[i];

        document.body.appendChild(anchor);
        anchor.setAttribute("target", "_blank");
        anchor.click();
        document.body.removeChild(anchor);

        //var download = 'https://ipfs.infura.io/ipfs/' + decryptCerts[i];
    },
    storeKey : function(key, iv) {
        key[row] = key;
        iv[row] = iv;
    },


    searchHash : function(hash, studentID) {
        console.table(identifier);
        var storedCerts = JSON.parse(localStorage.getItem("certs"));
        var isExist = 0;
        var t1 = performance.now();
        for (var i = 0; i < identifier.length; i++)
        {
            if(studentID == identifier[i])
            {
                isExist = 1;
                if(hash == storage[i]){
                    alert('Certificate is valid')
                    break;
                }
                else
                {
                    alert('Certificate not valid')
                    break;
                }
            }
            /*else if(hash == storedCerts[i])
            {
                alert('Certificate is valid')
            }*/
        }
        if((i == (identifier.length - 1) && identifier[i] != studentID) && isExist == 0|| (i == 1 && (identifier[i] != studentID)) && isExist == 0)
            alert('Identifier not found')
        var t2 = performance.now();
        var isExist =0;
        console.log("It took " + (t2 - t1)+ " milliseconds to perform search.")
        return hash;

    }
}

export default storageMethods;