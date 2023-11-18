const Landing = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 h-screen">
      <h1 className="text-3xl md:text-5xl font-semibold">You have no notes</h1>
      <button className="bg-[#B931FC] text-white text-sm md:text-xl py-2 px-8 rounded-lg font-medium">
        Create Note
      </button>
    </div>
  );
};

export default Landing;