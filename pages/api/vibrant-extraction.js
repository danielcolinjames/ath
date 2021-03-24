// import { ethers } from 'ethers'
// import { formatsByName } from '@ensdomains/address-encoder'
// import { abi as resolverContract } from '@ensdomains/resolver/build/contracts/Resolver.json'
// import { emptyAddress, namehash } from '@ensdomains/ensjs/dist/utils'

// function getProvider() {
//   return ethers.getDefaultProvider('homestead', {
//     etherscan: process.env.ETHERSCAN_API_KEY,
//   })
// }

// function getResolverContract({ address, provider }) {
//   return new ethers.Contract(address, resolverContract, provider)
// }

// import { usePalette } from "react-palette";
import * as Vibrant from "node-vibrant";

// async function getAddrWithResolver({ name, key, resolverAddr, provider }) {
//   const nh = namehash(name)
//   try {
//     const Resolver = getResolverContract({
//       address: resolverAddr,
//       provider,
//     })
//     const { coinType, encoder } = formatsByName[key]
//     const addr = await Resolver['addr(bytes32,uint256)'](nh, coinType)
//     if (addr === '0x') return emptyAddress

//     return encoder(Buffer.from(addr.slice(2), 'hex'))
//   } catch (e) {
//     console.log(e)
//     console.warn(
//       'Error getting addr on the resolver contract, are you sure the resolver address is a resolver contract?',
//     )
//     return emptyAddress
//   }
// }

export async function getImg(url) {
  try {
    const img = new Vibrant(url);
    const colors = await img.getPalette();
    return JSON.stringify(colors);
  } catch (error) {
    console.error(error);
  }
}