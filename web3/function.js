async function staked() {
    var stakednft = nftstake.methods.viewStakedNFTs(connectedAccount).call({
        from: connectedAccount
    }).then(function (result) {
        console.log(result);
        document.getElementById('stakedNFTs').innerText = result;
    });
}

async function accumulatedRewards() {
    try{
        var rewards = nftstake.methods.calculateTokens().call({
            from: connectedAccount
        }).then(function(result){
            document.getElementById('accumulatedRewards').innnerText = result;
        }); 
    } catch(error){
        console.error(error);
    }
}

// Function to handle staking NFT
async function stakeNFT() {
    // Get the input value (NFT ID)
    const nftID = document.getElementById('stakeNFTID').value;
    document.getElementById('message').innerText = 'Staking NFT...';
    try {
        // Call the stake function from the stake contract
        await nftstake.methods.stake(nftID).send({
            from: connectedAccount, // Use the global connected account
            value: 0 // Specify any additional value if required
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
    document.getElementById('message').innerText = 'Unstaking NFT...';
    try {
        await nftstake.methods.unstake(nftID).send({
            from: connectedAccount
        });
        console.log("unStaked NFT ID:", nftID);
        document.getElementById('message').innerText = 'NFT unstaked!';
    } catch (error) {
        console.error("an error occurred:", error);
        document.getElementById('message').innerText = 'Unable to unstake!';
    }
}

async function claimRewards() {
    try {
        const event = nftstake.methods.claimTokens().send({
            from: connectedAccount
        });
        accumulatedRewards();
        document.getElementById('message').innerText = 'Claimed!';
    } catch(error) {
        console.error('unable to claim', error);
        document.getElementById('message').innerHTML = 'ERROR: ' + error;
    }
}
setInterval(accumulatedRewards, 5000);