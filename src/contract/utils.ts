import { ethers } from 'ethers'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config/cfg'

export const getLibrary = (provider) => {
    return new ethers.providers.Web3Provider(provider)
}

export const getSigner = (provider : ethers.providers.Web3Provider) => {
    return provider.getSigner()
}

export const getContract = (provider : ethers.providers.Web3Provider) => {
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, getSigner(provider))
}

export const getSupply = async(provider : ethers.providers.Web3Provider) => {
    return Number(ethers.utils.formatUnits(await getContract(provider).totalSupply(), 0))
}

export const mint = async (provider : ethers.providers.Web3Provider) => {
    try{
        const transaction = await getContract(provider).mint(1, {
            value: ethers.utils.parseEther('0.03'),
        });
        
        await transaction.wait()

        return [transaction.hash, null]
    }catch(exc){
        console.log(exc)
        return [null, exc]
    }
}