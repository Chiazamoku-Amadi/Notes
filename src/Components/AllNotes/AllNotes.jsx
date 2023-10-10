import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const AllNotes = () => {
  const [searchData, setSearchData] = useState({ search: "" });

  function handleSearch(event) {
    const { name, value } = event.target;
    setSearchData((prevSearchData) => {
      return { ...prevSearchData, [name]: value };
    });
  }

  return (
    <div className="bg-rose-400 p-8 h-screen">
      <header className="flex flex-col md:flex-row md:justify-between gap-4 w-full">
        <div className="flex justify-start items-center gap-6">
          <FontAwesomeIcon icon="fa-solid fa-bars" />
          <h2 className="text-xl font-semibold pt-0.5">All Notes</h2>
        </div>

        <div className="flex justify-start items-center gap-2 bg-white text-sm font-medium p-2 rounded-xl md:w-3/12">
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
    </div>
  );
};

export default AllNotes;
