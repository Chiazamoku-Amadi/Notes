import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import PropTypes from "prop-types";

const AllNotes = ({ notes, openNewNote }) => {
  const plusIcon = (
    <FontAwesomeIcon
      icon="fa-solid fa-plus"
      size="lg"
      style={{
        color: "#a1a1aa",
      }}
    />
  );

  const [searchData, setSearchData] = useState({ search: "" });

  function handleSearch(event) {
    const { name, value } = event.target;
    setSearchData((prevSearchData) => {
      return { ...prevSearchData, [name]: value };
    });
  }

  const [categories, setCategories] = useState([
    {
      title: "Personal",
      content: [],
      image: (
        <FontAwesomeIcon
          icon="fa-solid fa-user"
          size="lg"
          style={{ color: "#b931fc" }}
        />
      ),
    },
    {
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

  let category = categories.map((category, index) => {
    return (
      <div
        key={index}
        className="flex flex-col justify-center items-center gap-2 cursor-pointer"
      >
        <span className="bg-zinc-200 p-3 rounded shadow-lg">
          {category.image}
        </span>
        <p className="text-xs font-semibold">{category.title}</p>
      </div>
    );
  });

  function createCategory() {
    const newCategory = {
      title: "Title",
      content: [],
      image: (
        <FontAwesomeIcon
          icon="fa-solid fa-user"
          size="lg"
          style={{ color: "#b931fc", fontSize: "24px" }}
        />
      ),
    };
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  }

  return (
    <div className="bg-slate-50 p-8 w-full z-0 relative">
      <header className="flex flex-col md:flex-row md:justify-between gap-4 w-full">
        <div className="flex justify-start items-center gap-6">
          <FontAwesomeIcon icon="fa-solid fa-bars" />
          <h2 className="text-xl font-bold pt-0.5">All Notes</h2>
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

      <section className="mt-8 w-full">
        <h3 className="text-base font-bold">Categories</h3>
        <div className="flex justify-start items-center gap-5 md:gap-8 flex-wrap py-4 w-full">
          {category}
          <button
            onClick={createCategory}
            className="bg-white p-3 self-start rounded shadow-lg"
          >
            {plusIcon}
          </button>
        </div>
      </section>

      <section className="flex flex-col justify-center items-start gap-4 mt-8 w-full">
        {notes}
      </section>

      <span className="flex justify-end items-center w-full md:w-1/2">
        <button
          onClick={openNewNote}
          className="bg-white mt-12 p-3 rounded-full shadow-lg"
        >
          {plusIcon}
        </button>
      </span>
    </div>
  );
};

// PropTypes Validation for AllNotes Component
AllNotes.propTypes = {
  notes: PropTypes.array,
  openNewNote: PropTypes.func,
};

export default AllNotes;
