/** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     './src/**/*.{js,jsx,ts,tsx}', // Include your React components
//     './node_modules/@ionic/react/**/*.{js,ts,jsx,tsx}' // Include Ionic components 
//   ],
//   theme: {
//     extend: {
//       colors: {
//         'brand-blue': '#0070f3',
//         'brand-green': '#00ff00',
//         'brand-red': '#ff0000',
//         'brand-yellow': '#ffff00',
//         'brand-purple': '#ff00ff',
//         'brand-cyan': '#00ffff',
//         'brand-white': '#ffffff',
//         'brand-black': '#000000',
//         'brand-gray': '#333333',
//         'brand-gray-light': '#f9f9f9',
//         'brand-gray-dark': '#111111',
//       },
//     },
//   },
//   plugins: [],
// };
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Ensure your source files are included
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#0070f3',
        'brand-green': '#00ff00',
        'brand-red': '#ff0000',
        'brand-yellow': '#ffff00',
        'brand-purple': '#ff00ff',
        'brand-cyan': '#00ffff',
        'brand-white': '#ffffff',
        'brand-black': '#000000',
        'brand-gray': '#333333',
        'brand-gray-light': '#f9f9f9',
        'brand-gray-dark': '#111111',
      },
    },
  },
  plugins: [],
};