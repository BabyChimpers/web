async function globalStaked(){
    var gStaked = nft.methods.balanceOf("0x902360C4aF6aA741c6e5f754d4d9C334dBEB7e19").call({from: connectedAccount}).then(function(result){
        document.getElementById('globalStaked').textContent = result;
    });
}

async function staked() {
    var stakednft = nftstake.methods.viewStakedNFTs(connectedAccount).call({
        from: connectedAccount
    }).then(function (result) {
        console.log(result);
        document.getElementById('stakedNFTs').innerText = result;
    });
}

async function idHeld() {
    var held = nft.methods.ownedNFTIdList(connectedAccount).call({from: connectedAccount}).then(function(result){
        console.log(result);
        document.getElementById('idHeld').textContent = result;
    });
}

async function accumulatedRewards() {
    try{
        var rewards = nftstake.methods.calculateTokens().call({
            from: connectedAccount
        }).then(function(result){
            document.getElementById('accumulatedRewards').textContent = (result/10**18);
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
        globalStaked();
        staked();
        idHeld();
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
        globalStaked();
        staked();
        idHeld();
    } catch (error) {
        console.error("an error occurred:", error);
        document.getElementById('message').innerText = 'Unable to unstake!';
    }
}

async function claimRewards() {
    try {
        document.getElementById('message').innerText = 'Claiming.';
        const event = nftstake.methods.claimTokens().send({
            from: connectedAccount
        }).then(function(result){
            document.getElementById('message').innerText = 'Claimed!';
        });
        accumulatedRewards();
    } catch(error) {
        console.error('unable to claim: ', error);
        document.getElementById('message').innerText = 'unable to claim';
    }
}

async function approveall() {
    try {
        document.getElementById('message').innerHTML = 'Approving all...';
        const event = nft.methods.setApprovalForAll("0x902360C4aF6aA741c6e5f754d4d9C334dBEB7e19", true).send({from: connectedAccount}).then(function(result){
            document.getElementById('message').innerText = 'Approved!';
            console.log(result);
        });
    } catch(error) {
        console.error('unable to approve: ', error);
        document.getElementById('message').innerText = 'Error approving!';
    }
}

async function numberHeld() {
    try {
        const event = nft.methods.balanceOf(connectedAccount).call({ from: connectedAccount}).then(function(result){
            console.log(result);
            document.getElementById('numberHeld').textContent = result;
        });
    } catch(error) {
        console.error(error);
    }
}

setInterval(accumulatedRewards, 5000);
setInterval(numberHeld, 5000);
setInterval(globalStaked, 30000);
setInterval(idHeld, 60000);