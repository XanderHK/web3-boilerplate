import { useWeb3React } from "@web3-react/core"
import Mint from "../src/components/Mint"
import { getSupply } from "../src/wallet/utils"

const Home = () => {
  const { library } = useWeb3React()
  
  // const readSupply = async () => {
  //   console.log(await getSupply(library))
  // }

  // readSupply()

  return (
    <div>
      <Mint />
    </div>
  )
}

export default Home
