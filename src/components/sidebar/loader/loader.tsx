const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full py-10">
      <div className="h-10 w-10 animate-spin rounded-full border-4   border-(--loader-border)
          border-t-(--loader-border-top)" />
    </div>
  );
};

export default Loader;
