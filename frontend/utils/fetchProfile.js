// // utils/fetchProfile.js
// import axios from 'axios';

// const GRAPH_API_URL = 'https://api.thegraph.com/subgraphs/name/ladoree-subgraph';

// export const fetchUserProfile = async (address) => {
//     const query = {
//         query: `
//       query GetUserProfile($id: ID!) {
//         user(id: $id) {
//           id
//           email
//           firstName
//           lastName
//         }
//       }
//     `,
//         variables: {
//             id: address.toLowerCase(), // Convertit l'adresse en minuscule pour correspondre à The Graph
//         },
//     };

//     try {
//         const response = await axios.post(GRAPH_API_URL, query);
//         return response.data.data.user;
//     } catch (error) {
//         console.error('Erreur lors de la récupération du profil utilisateur:', error);
//         throw error;
//     }
// };
