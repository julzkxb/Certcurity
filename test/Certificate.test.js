const _deploy_contracts = require('../migrations/2_deploy_contracts');

const Certificate = artifacts.require("Certificate");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Certificate', (accounts) => {
    let certificate

    before(async() => {
        certificate = await Certificate.deployed()
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
        certificate = await Certificate.deployed()
        const address = certificate.address
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
        assert.notEqual(address, 0x0)
        })   
    })

    describe('storage', async() => {
        it('updates the certificateHash', async () => {
           let certificateHash
            certificateHash = 'abc123'
            await certificate.set(certificateHash)
            const result = await certificate.get()
            assert.equal(result, certificateHash)
        })
    })
})