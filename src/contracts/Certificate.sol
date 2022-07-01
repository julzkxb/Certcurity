pragma solidity >=0.4.21;

contract Certificate {
    string certificateHash;

    //write function
    function set(string memory _certificateHash) public {
        certificateHash = _certificateHash;
    }

    //read fucntion
    function get() public view returns (string memory){
        return certificateHash;
    }

}
