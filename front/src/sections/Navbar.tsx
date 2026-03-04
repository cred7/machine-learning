import useStore from "../utils/Stores";

const Navbar = () => {
  const { setModel, url } = useStore();
  type ModelType = "lr" | "knn" | "tree";

  const t: { name: string; model: ModelType }[] = [
    { name: "Linear", model: "lr" },
    { name: "KNN", model: "knn" },
    { name: "Tree", model: "tree" },
  ];

  //   const px =
  //     "nth-[1]:hover:transform nth-[1]:hover:translate-1 nth-[1]:hover:rotate-45 nth-[2]:hover:transform nth-[2]:hover:-translate-1 nth-[2]:hover:-rotate-45 nth-[3]:hover:hidden";
  return (
    <section className="w-full h-12 fixed bg-green-500">
      <div className="flex justify-between w-full h-full pr-3 items-center">
        <div className="w-full h-full items-center">
          <div className="w-[30%] h-full flex items-center">
            {t.map((t) => (
              <button
                onClick={() => setModel(t.model)}
                className="transition-all duration-100 transform w-full flex-1 h-full items-center flex justify-center hover:bg-green-200 nth-[1]:hover:bg-green-800 nth-[1]:bg-white text-black nth-[1]:hover:text-black"
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
        <span>{url}</span>
        <div className="w-10  h-[90%] items-center flex">
          <div
            className={`w-[70%] gap-y-1 h-[50%] m-auto flex flex-col items-center`}
          >
            <span className=" w-full h-1 bg-black " />
            <span className=" w-full h-1 bg-black " />
            <span className=" w-full h-1 bg-black " />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
