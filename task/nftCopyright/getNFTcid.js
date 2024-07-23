const ethers = require('ethers');
const axios = require('axios');

// ABI for the tokenURI function
const abi = [
  "function tokenURI(uint256 tokenId) view returns (string)"
];

// Connect to Ethereum network (you may need to use a different provider)
const provider = new ethers.providers.JsonRpcProvider("https://eth.llamarpc.com");

async function getIPFSData(contractAddress, tokenId) {
  try {
    console.log("Contract Address:", contractAddress);
    console.log("Token ID:", tokenId);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    // Get the tokenURI
    const tokenURI = await contract.tokenURI(tokenId);
    
    // Extract IPFS hash from the tokenURI
    const ipfsHash = tokenURI.replace("ipfs://", "");
    
    // Fetch data from hardbin.com
    const response = await axios.get(`https://hardbin.com/ipfs/${ipfsHash}`);
    
    console.log("IPFS Data:", response.data);
    return response.data
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports =  getIPFSData ;