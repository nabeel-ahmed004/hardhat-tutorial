//imports
const { ethers, run, network } = require("hardhat");
require("dotenv").config();

//async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying Contract, Please Wait...");
  //const simpleStorage = await SimpleStorageFactory.deploy();
  const simpleStorage = await SimpleStorageFactory.deploy();
  //await simpleStorage.deployed();
  console.log(`Contract Deployed at: ${simpleStorage.target}`);
  //console.log(network.config); //for viewing the netowrk details
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    //checking if our network is Sepolia and(&&) we have an etherscan API key in the condition section
    //console.log("before");
    await simpleStorage.deploymentTransaction().wait(2);
    //await simpleStorage.waitForDeployment("6"); //waiting for etherscan to know about the transaction //use waitForDeployment("6") instead of wait(6)
    await verify(simpleStorage.target, []); //[] are empty beacuse we are not passing any arguments
    console.log(`Address: ${simpleStorage.target}`); //use target instead of address for contract address
    //console.log("after");
  }
  const currentValue = await simpleStorage.retrieve();
  console.log(`Current Value is: ${currentValue}`);
  const transactionResponse = await simpleStorage.store(100);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated Value is: ${updatedValue}`);
}

//we can also verify from the command line by passing some arguments which can be seen on the hardhat website but we are doing it programmatically using this verify function
//const verify = async (contractAddress, args) => { //this line and the bottom one are the same so we can declare functions in both ways
async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified");
    } else {
      console.log(e);
    }
  }
}

//main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
