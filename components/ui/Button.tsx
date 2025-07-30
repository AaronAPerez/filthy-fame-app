// Button Component
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'gift';
  size: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, size, loading, children, ...props }) => {

  

  const baseClasses = 'font-bold transition-all duration-200 focus:outline-none focus:ring-2 inline-flex items-center justify-center relative overflow-hidden';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 hover:from-indigo-600 hover:via-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-indigo-500/25',
    secondary: 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 hover:border-gray-500',
    success: 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg hover:shadow-emerald-500/25',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-yellow-500/25',
    danger: 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg hover:shadow-red-500/25',
    ghost: 'bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500',
    gift: 'bg-gradient-to-r from-yellow-500 via-emerald-500 to-green-500 hover:from-yellow-600 hover:via-emerald-600 hover:to-green-600 text-white shadow-lg hover:shadow-emerald-500/25',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl',
    xl: 'px-8 py-4 text-xl rounded-2xl',
  };


  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105'}`}
      disabled={loading}
      // onClick={onclick}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      <span className={loading ? 'opacity-0' : ''}>{children}</span>
    </button>
  );
};


export default Button;

