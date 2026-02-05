 import { createContext, useContext, ReactNode } from 'react';
 import { useTheme } from '@/hooks/useTheme';
 
 type Theme = 'light' | 'dark';
 
 interface ThemeContextType {
   theme: Theme;
   setTheme: (theme: Theme) => void;
   toggleTheme: () => void;
 }
 
 const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
 
 export const ThemeProvider = ({ children }: { children: ReactNode }) => {
   const themeState = useTheme();
   
   return (
     <ThemeContext.Provider value={themeState}>
       {children}
     </ThemeContext.Provider>
   );
 };
 
 export const useThemeContext = () => {
   const context = useContext(ThemeContext);
   if (!context) {
     throw new Error('useThemeContext must be used within ThemeProvider');
   }
   return context;
 };
 
 export default ThemeProvider;