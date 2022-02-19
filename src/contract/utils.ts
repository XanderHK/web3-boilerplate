import { ethers } from 'ethers'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config/cfg'
import axios from 'axios'

export const getLibrary = (provider) => {
    return new ethers.providers.Web3Provider(provider)
}

export const getSigner = (provider: ethers.providers.Web3Provider) => {
    return provider.getSigner()
}

export const getContract = (provider: ethers.providers.Web3Provider) => {
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, getSigner(provider))
}

export const getSupply = async (provider: ethers.providers.Web3Provider) => {
    return Number(ethers.utils.formatUnits(await getContract(provider).totalSupply(), 0))
}

export const mint = async (provider: ethers.providers.Web3Provider) => {
    try {
        const transaction = await getContract(provider).mint(1, {
            value: ethers.utils.parseEther('0.03'),
        });

        await transaction.wait()

        return [transaction.hash, null]
    } catch (exc) {
        return [null, exc]
    }
}

const parseIpfsURI = (uri : string) => {
    const location = uri.split("ipfs://").join("")
    return `https://ipfs.io/ipfs/${location}`
}

export const getNfts = async (provider: ethers.providers.Web3Provider) => {
    try {
        const address = await getSigner(provider).getAddress()
        const supply = await getSupply(provider)
        const contract = getContract(provider)
        const nftImageURIs = []
        for (let i = 1; i <= supply; i++) {
            const owner = await contract.ownerOf(i)
            if (owner === address) {
                const tokenURI = await contract.tokenURI(i)
                const res = await axios.get(parseIpfsURI(tokenURI))
                nftImageURIs.push(parseIpfsURI(res.data.image))
            }
        }
        return [nftImageURIs, null]
    } catch (exc) {
        return [null, exc]
    }
}