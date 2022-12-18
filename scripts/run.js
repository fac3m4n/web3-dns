const main = async () => {
    const [owner, randomAddress] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy();
    await domainContract.deployed();
    console.log("Contract deployed to:", domainContract.address);
    console.log("Contract deployed by:", owner.address);

    const transaction = await domainContract.register("doom");
    await transaction.wait();

    const domainOwner = await domainContract.getAddress("doom");
    console.log("Owner of Domain:", domainOwner);

    // Trying to set a record that doesn't belong to me!
    txn = await domainContract.connect(randomAddress).setRecord("doom", "Haha my domain now!");
    await txn.wait();

};

const runMain = async () => {
    try {
        await main();
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
};

runMain();