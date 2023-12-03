import web3 from './web3';
import SongRatingContract from './SongRatingContract.json';
// import SongRatingContract from '../contracts/SongRatingContract.sol';
    const contractAddress = '0x59dCEf2ed8b8d4CF2c8e70b054327D4c40d84Dec'; // Replace with your deployed contract address
    const instance = new web3.eth.Contract(SongRatingContract.abi, contractAddress);
export default instance;