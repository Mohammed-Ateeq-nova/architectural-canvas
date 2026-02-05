 import { ReactNode } from 'react';
 import { motion } from 'framer-motion';
 import { cn } from '@/lib/utils';
 
 interface GlassCardProps {
   children: ReactNode;
   className?: string;
   variant?: 'default' | 'heavy' | 'neon';
   hover?: boolean;
   onClick?: () => void;
 }
 
 export const GlassCard = ({
   children,
   className = '',
   variant = 'default',
   hover = true,
   onClick,
 }: GlassCardProps) => {
   const variants = {
     default: 'glass',
     heavy: 'glass-heavy',
     neon: 'glass dark:shadow-glow-cyan',
   };
 
   return (
     <motion.div
       whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
       transition={{ duration: 0.3 }}
       className={cn(
         variants[variant],
         'rounded-2xl p-6',
         hover && 'glass-hover cursor-pointer',
         className
       )}
       onClick={onClick}
     >
       {children}
     </motion.div>
   );
 };
 
 export const GlassCardLarge = ({
   children,
   className = '',
   variant = 'default',
   hover = true,
 }: GlassCardProps) => {
   return (
     <GlassCard
       variant={variant}
       hover={hover}
       className={cn('p-8 md:p-12 rounded-3xl', className)}
     >
       {children}
     </GlassCard>
   );
 };
 
 export default GlassCard;