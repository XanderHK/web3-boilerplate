import { ethers } from 'ethers'
import { API_URL, CONTRACT_ABI, CONTRACT_ADDRESS } from '../config/cfg'
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

const parseIpfsURI = (uri: string) => {
    const location = uri.split("ipfs://").join("")
    return `https://ipfs.io/ipfs/${location}`
}

export const getNfts = async (provider: ethers.providers.Web3Provider) => {
    // @todo pull the loop to the frontend so it can change the state immediately when match is found 
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


export const getAllNftRelations = async (provider: ethers.providers.Web3Provider) => {
    try {
        const supply = await getSupply(provider)
        const contract = getContract(provider)

        type NftRelation = {
            account: string,
            uri: string
        }

        const nftRelations: NftRelation[] = []
        for (let i = 1; i <= supply; i++) {
            const owner = await contract.ownerOf(i)
            const tokenURI = await contract.tokenURI(i)
            const res = await axios.get(parseIpfsURI(tokenURI))

            nftRelations.push({
                account: owner,
                uri: parseIpfsURI(res.data.image)
            })
        }
        return [nftRelations, null]
    } catch (exc) {
        return [null, exc]
    }
}


export const populateDb = async (provider: ethers.providers.Web3Provider) => {
    const [result, err] = await getAllNftRelations(provider)
    if (err) return
    try {
        const res = await axios.post(API_URL + '/populate', result, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        console.log(res)
    } catch (exc) {
        console.log(exc)
    }
}