// import { createContext, useContext, ReactNode } from 'react';

// // Define the context shape
// interface AccentColorContextType {
//   accentColor: string;
//   setAccentColor?: (color: string) => void; // Optional as it might not be available in server components
// }

// // Create the context with a default value
// export const AccentColorContext = createContext<AccentColorContextType>({ accentColor: 'defaultColor' });

// // Custom hook to use the context
// export const useAccentColor = () => useContext(AccentColorContext);

// // Context provider component
// export const AccentColorProvider = ({ children, value }: { children: ReactNode, value: AccentColorContextType }) => {
//   return (
//     <AccentColorContext.Provider value={value}>
//       {children}
//     </AccentColorContext.Provider>
//   );
// };
