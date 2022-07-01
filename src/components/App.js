import React, { Component } from 'react';
import Web3 from 'web3';
import logo from '../logo.png';
import './App.css';
import Certificate from '../abis/Certificate.json'
import cryptographicMod from './encrypt'
import hashStorage from './hashStorage'
import keyEncrypt from './keyEncrypt'

var toBuffer = require('typedarray-to-buffer')
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})
var certList = [];
var identifier = [];
var key = [];
var iv = [];
var row = 0;


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  //get account
  //get network
  //get smart contract
  //-->ABI Certificate.abi
  //-->Address networkData.address
  //get certificate hash
  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
    const networkId = await web3.eth.net.getId()
    const networkData = Certificate.networks[networkId]
    if(networkData) {
      const abi = Certificate.abi
      const address = networkData.address
      const contract = web3.eth.Contract(Certificate.abi, networkData.address)
      this.setState({ contract })
      const certificateHashList = await contract.methods.get().call()
			console.log(certificateHashList)
      certList.push(await contract.methods.get().call())
      //localStorage.setItem("certs", JSON.stringify(certs));
      var storedCerts = JSON.parse(localStorage.getItem("certs"));
      console.log(storedCerts)
      this.setState({ certificateHashList })
    } else {
      window.alert('Smart contract not deployed to detected network')
    }
  }

  constructor(props) {
    super(props);
    this.state = { 
      account: '',
      buffer: null,
      contract: null,
      certificateHash: '',
      studentID: '',
    };
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Metamask not detected!')
    }
  }

  onSearch = async (event) => {
		event.preventDefault()
		this.state.searchInput = event.target.value
	}

  captureFile = (event) => {
    event.preventDefault()
    //Process file for IPFS
    console.log('File detected...')
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  
  //example hash: QmVubiVcUNTY1SF3Y3ZC9jLv4P9jxMyx1xY8cr1NnPxKQ4
  //example url: https://ipfs.infura.io/ipfs/QmVubiVcUNTY1SF3Y3ZC9jLv4P9jxMyx1xY8cr1NnPxKQ4
  //example encrypted url: https://ipfs.infura.io/ipfs/QmR3JxAqxB9r2TypupGokK4fMs5XP3Be7fdmQFPHThB2WK
  onSubmit = (event) => {
    event.preventDefault()
    console.log("submitting the file...")

    var hashList = [];
    var studentID = this.state.studentID
    var certificateHash
    cryptographicMod.keyGenTime();
    var encCert = cryptographicMod.fileEncryption(this.state.buffer)
    console.log(encCert)
    console.log(this.state.buffer)

    var convEncCert = new Uint8Array([])
    convEncCert = toBuffer(encCert)
    console.log(convEncCert)

    ipfs.add(convEncCert, (error, result) => {
      console.log('ipfs result', result)
      certificateHash = result[0].hash
      this.setState( {certificateHash})

      if (error) {
        console.error(error)
        return
      }

      this.state.fileLink = 'https://ipfs.infura.io/ipfs/' + certificateHash
      console.log(this.state.fileLink)

      console.log('Checkpoint')
      //testing storage of hashes in an array
      //hashList = hashStorage.storeHash(certificateHash, this.state.searchInput)
      if(hashStorage.storeHash(certificateHash, this.state.searchInput) == 0)
      {
        return 0;
      }
      
      identifier[row] = this.state.searchInput;
      key[row] = cryptographicMod.keyStorage;
      console.table(key);
      iv[row] = cryptographicMod.ivStorage;
      row++;

      this.state.contract.methods.set(certificateHash).send({ from: this.state.account }).then((r) => {
        this.setState({ certificateHash })
      
      })
      
    })

    ipfs.add(this.state.buffer, (error, result) => {
      certificateHash = result[0].hash
      this.setState( {certificateHash})

      if (error) {
        console.error(error)
        return
      }

      hashStorage.decryptFile(certificateHash);
    })
  }
  

  /*readBlockchain = async (event) => {
    certs.push(await contract.methods.get().call())
    localStorage.setItem("certs", JSON.stringify(certs));
  }*/

  onSearchSubmit = async (event) => {
    event.preventDefault()
    console.log("Validating the file...")
    var certificateHash
    
    var encCert = cryptographicMod.fileEncryption(this.state.buffer)

    var convEncCert = new Uint8Array([])
    convEncCert = toBuffer(encCert)

    ipfs.add(convEncCert, (error, result) => {
      console.log('ipfs result', result)
      certificateHash = result[0].hash
      this.setState( {certificateHash})

      if (error) {
        console.error(error)
        return
      }

    hashStorage.searchHash(certificateHash, this.state.searchInput)
    })
  }

  onSearchCertSubmit = async (event) => {
    event.preventDefault()
    console.log("Searching for the file...")
    var isExist = 0;
      for (var i = 0; i < identifier.length; i++)
      {
          if(this.state.searchInput == identifier[i])
          {
              isExist = 1;
              var decFile = cryptographicMod.fileDecryption(this.state.buffer, key[i], iv[i]);
              console.log(hashStorage.showFile(i));
          }
      }
      if(isExist = 0)
        alert("Identifier not found")
      isExist = 0;
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
          >
            Certcurity
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white">{this.state.account}</small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <p>&nbsp;</p>
                <h2>Upload Certificate</h2>
                <form onSubmit={this.onSubmit} >
                <input type='search' onChange={this.onSearch.bind(this)} placeholder='Insert student ID here...' required/>
                  <input type='file' onChange={this.captureFile} required/>
                  <input type='submit' />
                </form>
                <h2><br></br>Validate Certificate</h2>
                <form onSubmit={this.onSearchSubmit} >
                <input type='search' onChange={this.onSearch.bind(this)} placeholder='Insert student ID here...' required/>
                  <input type='file' onChange={this.captureFile} required/>
                  <input type='submit' />
                </form>
                <h2><br></br>Search Certificate *FOR ISSUERS ONLY</h2>
                <form onSubmit={this.onSearchCertSubmit} >
                <input type='search' onChange={this.onSearch.bind(this)} placeholder='Insert student ID here...' required/>
                  <input type='submit'/>
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
