const Notfound = () => {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex items-center justify-center ">
        <div className="text-3xl flex flex-col items-center">
          404 Page Not found
          <a className="font-bold underline text-gray-500 text-lg" href="/">
            back
          </a>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
