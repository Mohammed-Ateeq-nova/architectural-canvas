 import { motion } from 'framer-motion';
 import { ReactNode } from 'react';
 
 interface PageTransitionProps {
   children: ReactNode;
   className?: string;
 }
 
 const pageVariants = {
   initial: {
     opacity: 0,
     y: 20,
     scale: 0.98,
   },
   animate: {
     opacity: 1,
     y: 0,
     scale: 1,
     transition: {
       duration: 0.6,
       ease: [0.22, 1, 0.36, 1],
       staggerChildren: 0.1,
     },
   },
   exit: {
     opacity: 0,
     y: -20,
     scale: 0.98,
     transition: {
       duration: 0.4,
       ease: [0.22, 1, 0.36, 1],
     },
   },
 };
 
 export const PageTransition = ({ children, className = '' }: PageTransitionProps) => {
   return (
     <motion.div
       variants={pageVariants}
       initial="initial"
       animate="animate"
       exit="exit"
       className={className}
     >
       {children}
     </motion.div>
   );
 };
 
 export const FadeIn = ({ 
   children, 
   delay = 0,
   className = '' 
 }: { 
   children: ReactNode; 
   delay?: number;
   className?: string;
 }) => {
   return (
     <motion.div
       initial={{ opacity: 0, y: 30 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ 
         delay, 
         duration: 0.7, 
         ease: [0.22, 1, 0.36, 1] 
       }}
       className={className}
     >
       {children}
     </motion.div>
   );
 };
 
 export const SlideIn = ({ 
   children, 
   direction = 'left',
   delay = 0,
   className = '' 
 }: { 
   children: ReactNode; 
   direction?: 'left' | 'right' | 'up' | 'down';
   delay?: number;
   className?: string;
 }) => {
   const directionMap = {
     left: { x: -50, y: 0 },
     right: { x: 50, y: 0 },
     up: { x: 0, y: -50 },
     down: { x: 0, y: 50 },
   };
 
   const initial = directionMap[direction];
 
   return (
     <motion.div
       initial={{ opacity: 0, ...initial }}
       animate={{ opacity: 1, x: 0, y: 0 }}
       transition={{ 
         delay, 
         duration: 0.7, 
         ease: [0.22, 1, 0.36, 1] 
       }}
       className={className}
     >
       {children}
     </motion.div>
   );
 };
 
 export const ScaleIn = ({ 
   children, 
   delay = 0,
   className = '' 
 }: { 
   children: ReactNode; 
   delay?: number;
   className?: string;
 }) => {
   return (
     <motion.div
       initial={{ opacity: 0, scale: 0.9 }}
       animate={{ opacity: 1, scale: 1 }}
       transition={{ 
         delay, 
         duration: 0.5, 
         ease: [0.22, 1, 0.36, 1] 
       }}
       className={className}
     >
       {children}
     </motion.div>
   );
 };
 
 export default PageTransition;