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
  // console.log(url);
  try {
    // const provider = getProvider()
    // const resolver = await provider.getResolver(name)
    // if (resolver) {
    //   const address = await getAddrWithResolver({
    //     name: name,
    //     key: 'HNT',
    //     resolverAddr: resolver.address,
    //     provider,
    //   })
    // const colors = usePalette(`https://cors.ath.ooo/${url}`);
    const img = new Vibrant(url);
    console.log(img);
    const colors = await img.getPalette();
    console.log(colors);
    // getSwatches(function (e, s) {
    //   if (e) {
    //     console.log(e);
    //   } else {
    //     console.log("swatches for remote url:");
    //     console.log(JSON.stringify(s, null, 2));
    //   }
    // });
    //   .then((palette) => console.log(palette));
    // const colors = await Vibrant.from({
    //   image: `https://cors.ath.ooo/${url}`,
    // }).useQuantizer(Vibrant.Quantizer.WebWorker);

    // const colors = await Vibrant.from(
    //   axios({
    //     method: "get",
    //     url: url,
    //     responseType: "arraybuffer",
    //   })
    // ).getPalette((err, palette) => console.log(palette));
    // console.log(colors);

    return JSON.stringify(colors);
    // }
  } catch (error) {
    console.error(error);
  }

  // res.status(200).json({ colors: null });
}
