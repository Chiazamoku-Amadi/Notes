import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa6";
import { BsAlarmFill } from "react-icons/bs";

const Modal = ({
  allNotes,
  openNewNoteModal,
  closeNewNote,
  noteData,
  setNoteData,
  setAllNotes,
  setCurrentNoteId,
}) => {
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();

  function handleChange(event) {
    setNoteData((prevNoteData) => {
      return {
        ...prevNoteData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function createNote() {
    const newNote = {
      id: 0,
      title: noteData.title,
      description: noteData.description,
      date: `${day}/${month}`,
      time: `${hour}:${minute}`,
      menu: <FontAwesomeIcon icon="fa-solid fa-ellipsis" />,
    };
    console.log(allNotes);

    setAllNotes((prevAllNotes) => [newNote, ...prevAllNotes]);
    setCurrentNoteId(newNote.id);
    allNotes.map((note, index) => {
      note.id = index + 1; // Why did I have to add "+ 1" before it worked?
    });

    console.log(allNotes); // Why does this not work properly? Why does it work properly only outside the func?
  }
  console.log(allNotes);

  return (
    <>
      {openNewNoteModal ? (
        <>
          <div className="p-8 w-full h-full fixed top-0 left-0 bg-neutral-700 opacity-50 z-50" />
          <div className="bg-slate-50 flex flex-col justify-start items-start gap-6 p-6 md:p-8 rounded-2xl w-3/4 h-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <header className="flex justify-between items-center w-full">
              <div className="flex justify-between items-center gap-6">
                <FontAwesomeIcon
                  icon="fa-solid fa-arrow-left"
                  onClick={() => {
                    closeNewNote();
                    createNote();
                  }}
                  size="sm"
                  style={{ cursor: "pointer" }}
                />
                <h2 className="text-lg md:text-xl font-bold">Add Notes</h2>
              </div>
              <FontAwesomeIcon
                icon="fa-solid fa-check"
                size="sm"
                style={{ cursor: "pointer" }}
              />
            </header>

            <section className="flex flex-col justify-start items-start gap-2 w-full">
              <label htmlFor="title" className="text-sm md:text-base font-bold">
                Title
              </label>
              <textarea
                name="title"
                value={noteData.title}
                onChange={handleChange}
                id="title"
                placeholder="Title"
                cols="30"
                rows="1"
                className="w-full p-2 rounded shadow-lg outline-none border-none resize-none overflow-hidden text-xs md:text-sm"
              />
            </section>

            <section className="flex flex-col justify-center items-start gap-2 w-full">
              <label htmlFor="title" className="text-sm md:text-base font-bold">
                Description
              </label>
              <textarea
                name="description"
                value={noteData.description}
                onChange={handleChange}
                id="description"
                placeholder="Note something down"
                cols="30"
                rows="10"
                className="w-full p-2 rounded shadow-lg outline-none border-none resize-none overflow-hidden text-xs md:text-sm"
              />
            </section>

            <footer className="flex justify-between items-center mt-8 w-full">
              <div className="flex flex-col justify-center items-center gap-1">
                <FaRegCircleCheck className="text-slate-500 text-xs md:text-base" />
                <p className="text-slate-500 text-xs md:text-base font-bold">
                  To-do
                </p>
              </div>
              <div className="flex flex-col justify-center items-center gap-1">
                <FaMicrophone className="text-slate-500 text-xs md:text-base" />
                <p className="text-slate-500 text-xs md:text-base font-bold">
                  Audio
                </p>
              </div>
              <div className="flex flex-col justify-center items-center gap-1">
                <FaRegImage className="text-slate-500 text-xs md:text-base" />
                <p className="text-slate-500 text-xs md:text-base font-bold">
                  Image
                </p>
              </div>
              <div className="flex flex-col justify-center items-center gap-1">
                <BsAlarmFill className="text-slate-500 text-xs md:text-base" />
                <p className="text-slate-500 text-xs md:text-base font-bold">
                  Reminder
                </p>
              </div>
            </footer>
          </div>
        </>
      ) : null}
    </>
  );
};

// PropTypes Validation for Modal Component
Modal.propTypes = {
  allNotes: PropTypes.array,
  closeNewNote: PropTypes.func,
  openNewNoteModal: PropTypes.bool,
  noteData: PropTypes.object,
  setNoteData: PropTypes.func,
  setAllNotes: PropTypes.func,
  setCurrentNoteId: PropTypes.func,
};

export default Modal;
