import React, { useState, useEffect } from 'react';
import contract from './contract';
import './App.css';

   function App() {
     const [rating, setRating] = useState(0);
     const [feedback, setFeedback] = useState('');
     const [averageRating, setAverageRating] = useState(0);

     useEffect(() => {
       fetchAverageRating();
     }, []);

     const fetchAverageRating = async () => {
       const songId = 3; // Replace with your desired song ID
       const average = await contract.methods.calculateAverageRating(songId).call();
       setAverageRating(average);
     };

     const handleRatingChange = (e) => {
       setRating(e.target.value);
     };

     const handleFeedbackChange = (e) => {
       setFeedback(e.target.value);
     };

     const handleRateSong = async () => {
       const songId = 3; // Replace with your desired song ID
       await contract.methods.rateSong(songId, rating).send({ from: '0x4443a2E5269C243f63e83B7c5C3ca4e850ecFaE6' }); // Replace with your Ethereum account address
       fetchAverageRating();
     };

     const handleProvideFeedback = async () => {
       const songId = 3; // Replace with your desired song ID
       await contract.methods.provideFeedback(songId, feedback).send({ from: '0x4443a2E5269C243f63e83B7c5C3ca4e850ecFaE6' }); // Replace with your Ethereum account address
     };

     const songId= 3;
     return (
       <div>
         <h1>Song Rating dApp</h1>
         <h1>Song Id: {songId}</h1>
         <h2>Average Rating: {averageRating}</h2>
         <div>
           <label htmlFor="rating">Rating (1-5):</label>
           <input type="number" id="rating" min="1" max="5" value={rating} onChange={handleRatingChange} />
           <button onClick={handleRateSong}>Rate Song</button>
         </div>
         <div>
           <label htmlFor="feedback">Feedback:</label>
           <input type="text" id="feedback" value={feedback} onChange={handleFeedbackChange} />
           <button onClick={handleProvideFeedback}>Provide Feedback</button>
         </div>
       </div>
     );
   }
export default App;


//the og code
// import logo from './logo.svg';
// import './App.css';
// import SongRatingContract from '../build/contracts/SongRatingContract.json' ;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit src/App.js and save to reload.
//           {/* <SongRatingContract> 
//              </SongRatingContract> */}
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
// export default App;