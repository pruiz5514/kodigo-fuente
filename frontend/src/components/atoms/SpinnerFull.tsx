const SpinnerFull = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm gap-6" role="status" aria-live="polite">
      <div className="w-24 h-24 border-[6px] border-gray-300 border-t-[6px] border-t-blue-500 rounded-full animate-spin shadow-lg" />
    </div>
  );
};

export default SpinnerFull;