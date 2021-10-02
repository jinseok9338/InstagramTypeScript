const Spinner = () => (
  <span className="flex h-3 w-3 ">
        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-primary opacity-75" />
        <span className="absolute inline-flex rounded-full h-3 w-3 bg-red-background" />
  </span>
);

export default Spinner;
