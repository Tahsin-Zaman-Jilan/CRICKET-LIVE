// import React, { useState, useEffect } from 'react';
// function MyComponent() {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
  
//     useEffect(() => {
//       // Define the API URL you want to fetch data from
//       const apiUrl = 'https://api.cricapi.com/v1/currentMatches?apikey=f7a8b179-d762-4e69-8081-02fae36d94fc&offset=0';
  
//       // Use the fetch function to make the API request
//       fetch(apiUrl)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })
//         .then((data) => {
//           setData(data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//           setLoading(false);
//         });
//     }, []);
  
//     return (
//       <div>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <ul>
//             {data.map((item) => (
//               <li key={item.id}>{item.name}</li>
//             ))}
//           </ul>
//         )}
//       </div>
//     );
//   }
  
//   export default MyComponent;
  