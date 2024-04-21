// Function to handle staking NFT
async function stakeNFT() {
    // Get the input value (NFT ID)
    const nftID = document.getElementById('stakeNFTID').value;
    try {
        // Call the stake function from the stake contract
        await nftstake.methods.stake(nftID).send({
            from: connectedAccount, // Use the global connected account
            value: 0 // Specify any additional value if required
        }).then(function(result){
            document.getElementById('message').innerText = 'Staking NFT...';
        });
        console.log("Staked NFT ID:", nftID);
        // Handle successful staking
        document.getElementById('message').innerText = 'NFT staked successfully!';
    } catch (error) {
        console.error("An error occurred:", error);
        document.getElementById('message').innerText = 'Error staking NFT!';
    }
}

async function unstakeNFT() {
    const nftID = document.getElementById('unstakeNFTID').value;
    try {
        await nftstake.methods.unstake(nftID).send({
            from: connectedAccount
        }).then(function(result){
            document.getElementById('message').innerText = 'Unstaking nft...';
        });
        console.log("unStaked NFT ID:", nftID);
        document.getElementById('message').innerText = 'NFT unstaked!';
    } catch(error){
        console.error("an error occurred:",error);
        document.getElementById('message').innerText = 'Unable to unstake!';
    }
}