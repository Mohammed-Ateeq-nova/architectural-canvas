 import { useState, useEffect, useCallback } from 'react';
 
 type Theme = 'light' | 'dark';
 
 export const useTheme = () => {
   const [theme, setThemeState] = useState<Theme>(() => {
     if (typeof window !== 'undefined') {
       const stored = localStorage.getItem('theme') as Theme;
       if (stored) return stored;
       return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
     }
     return 'light';
   });
 
   const setTheme = useCallback((newTheme: Theme) => {
     setThemeState(newTheme);
     localStorage.setItem('theme', newTheme);
     
     // Smooth transition
     document.documentElement.style.setProperty('--theme-transition', '0.5s');
     
     if (newTheme === 'dark') {
       document.documentElement.classList.add('dark');
     } else {
       document.documentElement.classList.remove('dark');
     }
     
     setTimeout(() => {
       document.documentElement.style.removeProperty('--theme-transition');
     }, 500);
   }, []);
 
   const toggleTheme = useCallback(() => {
     setTheme(theme === 'dark' ? 'light' : 'dark');
   }, [theme, setTheme]);
 
   useEffect(() => {
     // Initial setup
     if (theme === 'dark') {
       document.documentElement.classList.add('dark');
     } else {
       document.documentElement.classList.remove('dark');
     }
   }, []);
 
   return { theme, setTheme, toggleTheme };
 };
 
 export default useTheme;