import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import PropTypes from "prop-types";

const AllNotes = ({
  notes,
  openNote,
  selectedNotes,
  selectAll,
  handleIsSelected,
  deleteSelectedNotes,
  searchQuery,
  handleSearch,
}) => {
  const plusIcon = <FontAwesomeIcon icon="fa-solid fa-plus" size="lg" />;

  // Dummy categories
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

        {/* Search bar */}
        <div className="flex justify-start items-center gap-2 bg-white text-sm font-medium p-2 rounded-xl shadow-lg md:w-3/12">
          <label htmlFor="search">
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          </label>
          <input
            type="search"
            placeholder="Search notes"
            onChange={handleSearch}
            value={searchQuery}
            id="search"
            className="search outline-none w-full"
          />
        </div>
      </header>

      {/* Category section */}
      <section className="mt-8 w-full">
        <h3 className="text-base font-bold">Categories</h3>
        <div className="flex justify-start items-center gap-5 md:gap-8 flex-wrap py-4 w-full">
          {category}
          <button
            onClick={createCategory}
            className="plus bg-white hover:bg-[#B931FC] hover:fill-white p-3 self-start rounded shadow-lg"
          >
            {plusIcon}
          </button>
        </div>
      </section>

      <section className="flex flex-col justify-center items-start gap-8 mt-8 w-full">
        {selectedNotes.length !== 0 ? (
          <div className="flex justify-end items-center gap-4 w-full md:w-1/2">
            {/* For deleting multiple notes */}
            <div className="flex justify-center items-center gap-2">
              <p className="text-xs font-bold">Delete Selected</p>
              <FontAwesomeIcon
                icon="fa-regular fa-trash-can"
                size="xs"
                onClick={() => deleteSelectedNotes()}
                className="icons cursor-pointer"
              />
            </div>

            {/* For bulk selection */}
            <div className="flex justify-center items-center gap-2 pr-3">
              <label htmlFor="selectAll" className="text-xs font-bold">
                Select All
              </label>
              <input
                type="checkbox"
                id="selectAll"
                // Passed "all" as an argument to handleIsSelected just to signify ALL notes. "all" is the value of "index"(the func. parameter)
                onChange={() => handleIsSelected("all")}
                checked={selectAll}
                className="cursor-pointer"
              />
            </div>
          </div>
        ) : null}

        {/* All Notes */}
        {notes}
      </section>

      {/* To create new note */}
      <span className="flex justify-end items-center w-full md:w-1/2 z-0">
        <button
          onClick={() => openNote(null)}
          className="plus bg-white hover:bg-[#B931FC] mt-12 p-3 rounded-full shadow-lg"
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
  openNote: PropTypes.func,
  selectedNotes: PropTypes.array,
  selectAll: PropTypes.bool,
  handleIsSelected: PropTypes.func,
  deleteSelectedNotes: PropTypes.func,
  searchQuery: PropTypes.string,
  handleSearch: PropTypes.func,
};

export default AllNotes;
