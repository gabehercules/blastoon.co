// verify if the user/address owns at leat one NFT

// 1 - check in the NFT Scan API for the user to see if he owns at least one NFT
// 2 - if he does not, return a custom message say that the user needs to own at
// least one NFT (handle the "buy NFT component")
// 3 - if he does, return the user's NFTs in a new object containing only tokenId
// to make a createMany() call to prisma, passing the tokenId's and the user's address
// to create/update the user's NFTs in the database
