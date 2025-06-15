interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

export default function LoadingSpinner({fullScreen = false }: LoadingSpinnerProps) {
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center space-y-4"
    : "w-full h-60 md:h-80 lg:h-96 xl:h-100 flex flex-col items-center justify-center space-y-4";

  return (
    <>
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40" />
      
      {/* Spinner and message container */}
      <div className={containerClasses}>
        <div className="relative">
          {/* Outer ring */}
          {/* Inner spinner */}
          <div className="absolute inset-0 w-16 h-16 border-8 border-orange-500 border-dashed border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </>
    
  );
} 