const { expect } = require("chai");

describe("NFTMarket", function () {
  it("Should create and execute market sales", async function () {
    /* deploy the marketplace */
    const Market = await ethers.getContractFactory("NFTMarket")
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address


    /* deploy the NFT */
    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy()
    await nft.deployed()
    const nftContractAddress = nft.address
    
    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('1', 'ether')

    /* create two tokens */
    await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice})
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice})

    const [_, buyerAddress] = await ethers.getSigners()

    /* execute sale of token to another user */
    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice})

    /* query for and return the unsold items */
    items = await market.fetchMarketItems()
    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenUri(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenUri.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    console.log('items: ', items)
  });
});