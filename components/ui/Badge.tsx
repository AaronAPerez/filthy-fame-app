// import React from 'react'


// // Reusable Badge Component
// const Badge = ({ 
//   variant = 'string', 
//   size = 'md',
//   className = '', 
//   children,
//   ...props 
// }) => {
//   const baseClasses = 'font-bold inline-flex items-center justify-center';
  
//   const variantClasses = {
//     default: 'bg-gray-700 text-gray-200',
//     primary: 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white',
//     success: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white',
//     warning: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
//     danger: 'bg-gradient-to-r from-red-500 to-orange-500 text-white',
//     trending: 'bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse',
//     live: 'bg-gradient-to-r from-red-500 to-orange-500 text-white animate-pulse',
//   };
  
//   const sizeClasses = {
//     sm: 'px-2 py-1 text-xs rounded-md',
//     md: 'px-3 py-1 text-sm rounded-lg',
//     lg: 'px-4 py-2 text-base rounded-xl',
//   };
  
//   return (
//     <span 
//       className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
//       {...props}
//     >
//       {children}
//     </span>
//   );
// };

// export default Badge