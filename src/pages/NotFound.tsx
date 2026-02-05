 import { Link, useLocation } from 'react-router-dom';
 import { useEffect } from 'react';
 import { ArrowLeft, Home } from 'lucide-react';
 import { motion } from 'framer-motion';
 
 const NotFound = () => {
   const location = useLocation();
 
   useEffect(() => {
     console.error("404 Error: User attempted to access non-existent route:", location.pathname);
   }, [location.pathname]);
 
   return (
     <div className="min-h-screen flex items-center justify-center bg-background">
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6 }}
         className="text-center section-container"
       >
         <motion.span 
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ delay: 0.2, type: 'spring' }}
           className="text-display-xl dark:neon-text-cyan block mb-8"
         >
           404
         </motion.span>
         
         <h1 className="text-display-md mb-4">Page Not Found</h1>
         <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
           The page you're looking for doesn't exist or has been moved.
         </p>
         
         <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Link
             to="/"
             className="glass rounded-full px-6 py-3 font-display font-medium inline-flex items-center justify-center gap-2 hover:scale-105 transition-transform"
           >
             <Home className="w-4 h-4" />
             Back to Home
           </Link>
           <button
             onClick={() => window.history.back()}
             className="border-2 border-foreground dark:border-neon-cyan rounded-full px-6 py-3 font-display font-medium inline-flex items-center justify-center gap-2 hover:bg-foreground hover:text-background dark:hover:bg-neon-cyan transition-colors"
           >
             <ArrowLeft className="w-4 h-4" />
             Go Back
           </button>
         </div>
       </motion.div>
     </div>
   );
 };
 
 export default NotFound;
