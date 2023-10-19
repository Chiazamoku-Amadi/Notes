import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const AllNotes = () => {
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
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

  const [allNotes, setAllNotes] = useState([
    {
      id: 1,
      title: "Team Meeting",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi ut exercitationem, incidunt asperiores recusandae placeat nostrum accusamus dolor neque cupiditate.",
      date: `${day}/${month}`,
      time: `${hour}:${minute}`,
      menu: <FontAwesomeIcon icon="fa-solid fa-ellipsis" />,
    },
    {
      id: 2,
      title: "Team Meeting",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi ut exercitationem, incidunt asperiores recusandae placeat nostrum accusamus dolor neque cupiditate.",
      date: `${day}/${month}`,
      time: `${hour}:${minute}`,
      menu: <FontAwesomeIcon icon="fa-solid fa-ellipsis" />,
    },
    {
      id: 3,
      title: "Team Meeting",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi ut exercitationem, incidunt asperiores recusandae placeat nostrum accusamus dolor neque cupiditate.",
      date: `${day}/${month}`,
      time: `${hour}:${minute}`,
      menu: <FontAwesomeIcon icon="fa-solid fa-ellipsis" />,
    },
    {
      id: 4,
      title: "Team Meeting",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi ut exercitationem, incidunt asperiores recusandae placeat nostrum accusamus dolor neque cupiditate.",
      date: `${day}/${month}`,
      time: `${hour}:${minute}`,
      menu: <FontAwesomeIcon icon="fa-solid fa-ellipsis" />,
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
        className="flex flex-col justify-center items-center gap-2 cursor-pointer"
      >
        <span className="bg-zinc-200 p-3 rounded shadow-lg">
          {category.image}
        </span>
        <p className="text-xs font-semibold">{category.title}</p>
      </div>
    );
  });

  let notes = allNotes.map((note) => {
    return (
      <div
        key={note.id}
        className="flex justify-between items-center bg-white p-3 rounded-xl shadow-lg w-full md:w-1/2 cursor-pointer"
      >
        <div className="flex flex-col justify-center items-start gap-2">
          <h4 className="text-xs font-bold">{note.title}</h4>
          <p className="text-small text-zinc-400">
            {note.description.slice(0, 31) + "..."}
          </p>
        </div>
        <div className="flex flex-col justify-center items-start gap-2">
          <p className="text-small self-end">{note.menu}</p>
          <h4 className="text-small font-bold">{note.date}</h4>
        </div>
      </div>
    );
  });

  return (
    <div className="bg-slate-50 p-8 w-full">
      <header className="flex flex-col md:flex-row md:justify-between gap-4 w-full">
        <div className="flex justify-start items-center gap-6">
          <FontAwesomeIcon icon="fa-solid fa-bars" />
          <h2 className="text-2xl font-bold pt-0.5">All Notes</h2>
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
          <button className="bg-white p-3 self-start rounded shadow-lg">
            {plusIcon}
          </button>
        </div>
      </section>

      <section className="flex flex-col justify-center items-start gap-4 mt-8 w-full">
        {notes}
      </section>

      <span className="flex justify-end items-center w-full md:w-1/2">
        <button className="bg-white mt-12 p-3 rounded-full shadow-lg">
          {plusIcon}
        </button>
      </span>
    </div>
  );
};

export default AllNotes;
