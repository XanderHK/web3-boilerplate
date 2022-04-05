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
        await newMintEntry(provider)
        return [transaction.hash, null]
    } catch (exc) {
        return [null, exc]
    }
}


const parseIpfsURI = (uri: string) => {
    const location = uri.split("ipfs://").join("")
    return `https://ipfs.io/ipfs/${location}`
}

const newMintEntry = async (provider: ethers.providers.Web3Provider) => {
    const lastMintId = await getSupply(provider)
    const contract = getContract(provider)
    const tokenURI = await contract.tokenURI(lastMintId)
    const res = await axios.get(parseIpfsURI(tokenURI))

    const newMintData = {
        account: await getSigner(provider).getAddress(),
        uri: parseIpfsURI(res.data.image),
        tokenId: lastMintId
    }

    try {
        axios.post(`${API_URL}/add`, newMintData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (exc) {
        console.log(exc)
    }
}

export const fetchNfts = async () => {
    try {
        const res = await axios.get(API_URL + `/accounts/}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        return [res.data, null]
    } catch (exc) {
        return [null, exc]
    }
}

export const fetchNftsOfConnected = async (account: string) => {
    try {
        const res = await axios.get(API_URL + `/accounts/${account}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        return [res.data, null]
    } catch (exc) {
        return [null, exc]
    }
}

type TransferArgs = {
    provider: ethers.providers.Web3Provider, to: string, tokenId: number
}

export const transfer = async ({ provider, to, tokenId }: TransferArgs) => {
    try {
        const contract = getContract(provider)
        const from = await getSigner(provider).getAddress();
        const transaction = await contract["safeTransferFrom(address,address,uint256)"](from, to, tokenId);
        await transaction.wait()

        const tokenURI = await contract.tokenURI(tokenId)
        const res = await axios.get(parseIpfsURI(tokenURI))
        const imgURI = parseIpfsURI(res.data.image)

        // delete URI on the from address
        await axios.delete(API_URL + `/remove-uri/${encodeURIComponent(imgURI)}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        // add URI on the to address
        const newMintData = {
            account: to,
            uri: imgURI
        }

        await axios.post(`${API_URL}/add`, newMintData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // remove specific nft from redux
        return [transaction.hash, null]
    } catch (exc) {
        return [null, exc]
    }
}

export const populateNftsByAddress = async (provider: ethers.providers.Web3Provider) => {
    try {
        const contract = getContract(provider)
        const from = await getSigner(provider).getAddress();
        const tokens = await contract.walletOfOwner(from)
        const uris = await Promise.all(tokens?.map(async (e) => {
            const decimal = parseInt(e._hex, 16)
            const tokenURI = await contract.tokenURI(decimal)
            const res = await axios.get(parseIpfsURI(tokenURI))
            const imgURI = parseIpfsURI(res.data.image)

            const data = {
                account: await getSigner(provider).getAddress(),
                uri: imgURI,
                tokenId: decimal
            }

            await axios.post(`${API_URL}/add`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            return imgURI
        }));

        // console.log(uris)

        return [uris, null]
    } catch (exc) {
        console.log(exc)
        return [null, exc]
    }
}


export const createSale = async () => {

}

export const buyNft = async () => {

}

export const isMobileDevice = () => {
    return 'ontouchstart' in window || 'onmsgesturechange' in window
}