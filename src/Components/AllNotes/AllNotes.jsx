import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const AllNotes = () => {
  const [searchData, setSearchData] = useState({ search: "" });
  const [categories, setCategories] = useState([
    {
      id: 1,
      title: "Personal",
      content: [],
      // image: <FaUser />,
      image: (
        <FontAwesomeIcon
          icon="fa-solid fa-user"
          size="lg"
          style={{ color: "#b931fc" }}
        />
      ),
    },
    {
      id: 2,
      title: "Work",
      content: [],
      image: (
        <FontAwesomeIcon
          icon="fa-solid fa-briefcase"
          size="lg"
          style={{ color: "#15803D" }}
        />
      ),
    },
    {
      id: 3,
      title: "Travel",
      content: [],
      image: (
        <FontAwesomeIcon
          icon="fa-solid fa-car"
          size="lg"
          style={{ color: "#F4CE14" }}
        />
      ),
    },
    {
      id: 4,
      title: "Health",
      content: [],
      image: (
        <FontAwesomeIcon
          icon="fa-solid fa-capsules"
          size="lg"
          style={{ color: "#A1A1AA" }}
        />
      ),
    },
  ]);

  function handleSearch(event) {
    const { name, value } = event.target;
    setSearchData((prevSearchData) => {
      return { ...prevSearchData, [name]: value };
    });
  }

  let category = categories.map((category) => {
    return (
      <div
        key={category.id}
        className="flex flex-col justify-center items-center gap-2"
      >
        <span className="bg-zinc-200 p-3 rounded shadow-lg">
          {category.image}
        </span>
        <p className="text-small font-semibold">{category.title}</p>
      </div>
    );
  });

  return (
    <div className="bg-slate-50 p-8 h-screen">
      <header className="flex flex-col md:flex-row md:justify-between gap-4 w-full">
        <div className="flex justify-start items-center gap-6">
          <FontAwesomeIcon icon="fa-solid fa-bars" />
          <h2 className="text-xl font-semibold pt-0.5">All Notes</h2>
        </div>

        <div className="flex justify-start items-center gap-2 bg-white text-sm font-medium p-2 rounded-xl shadow-lg md:w-3/12">
          <label htmlFor="search">
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          </label>
          <input
            type="search"
            placeholder="Search notes"
            onChange={handleSearch}
            name="search"
            value={searchData.search}
            id="search"
            className="search outline-none w-full"
          />
        </div>
      </header>

      <section className="my-8">
        <h3 className="text-base font-semibold">Categories</h3>
        <div className="flex justify-start items-center gap-5 md:gap-8 flex-wrap py-4">
          {category}
          <FontAwesomeIcon
            icon="fa-solid fa-plus"
            size="lg"
            style={{
              color: "#a1a1aa",
              backgroundColor: "#ffffff",
              padding: "0.75rem",
              alignSelf: "flex-start",
              borderRadius: "0.25rem",
              boxShadow:
                "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default AllNotes;
