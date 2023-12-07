import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = ({
  allNotes,
  handleModal,
  closeNote,
  noteData,
  setNoteData,
  setAllNotes,
  currentNoteId,
}) => {
  // Creates references to title and description input fields
  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const newNote = {
    id: 0,
    title: noteData.title,
    description: noteData.description,
    date: `${day}/${month}`,
    time: `${hour}:${minute}`,
    menu: <FontAwesomeIcon icon="fa-solid fa-ellipsis" />,
  };

  // Used useEffect to focus the title field when handleModal state changes
  useEffect(() => {
    if (handleModal && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [handleModal]);

  function handleChange(event) {
    setNoteData((prevNoteData) => {
      return {
        ...prevNoteData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleNotes() {
    if (noteData.description || noteData.title) {
      const updatedNotes = [...allNotes]; // To avoid mutating the state
      // Check if editing an existing note
      if (currentNoteId !== null) {
        const existingNote = updatedNotes[currentNoteId]; // Get the existing note at the currentNoteId index
        // Check if title or description of existing note has changed
        if (
          existingNote.title !== noteData.title ||
          existingNote.description !== noteData.description
        ) {
          Object.assign(updatedNotes[currentNoteId], noteData); // Updates the existing note with new title and description
          const currentNote = updatedNotes.splice(currentNoteId, 1)[0]; // Removes existing note from its current position
          updatedNotes.splice(0, 0, currentNote); // Inserts the updated note at the beginning of the updatedNotes array
        }
      } else {
        updatedNotes.unshift(Object.assign(newNote, noteData)); // Merges newNote with noteData, then adds it to the beginning of the updatedNotes array
      }
      setAllNotes(updatedNotes);
    }
    closeNote();
  }

  // This unfocuses any focused INPUT field
  function saveNote() {
    if (document.activeElement.tagName === "INPUT") {
      document.activeElement.blur();
    }
  }

  return (
    <>
      {handleModal ? (
        <>
          <div className="p-8 w-full h-full fixed top-0 left-0 bg-neutral-700 opacity-50 z-50" />
          <div className="bg-slate-50 flex flex-col justify-start items-start gap-6 p-6 md:p-8 rounded-2xl w-3/4 h-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <header className="flex justify-between items-center w-full">
              <div className="flex justify-between items-center gap-6">
                <FontAwesomeIcon
                  icon="fa-solid fa-arrow-left"
                  onClick={() => handleNotes()}
                  size="sm"
                  style={{ cursor: "pointer" }}
                  className="icons"
                />
                <h2 className="text-lg md:text-xl font-bold">Add Notes</h2>
              </div>
              <FontAwesomeIcon
                icon="fa-solid fa-check"
                onClick={saveNote}
                size="sm"
                style={{ cursor: "pointer" }}
                className="icons"
              />
            </header>

            {/* Title Field */}
            <section className="flex flex-col justify-start items-start gap-2 w-full">
              <label htmlFor="title" className="text-sm md:text-base font-bold">
                Title
              </label>
              <textarea
                name="title"
                value={noteData.title}
                onChange={handleChange}
                ref={titleInputRef}
                id="title"
                placeholder="Title"
                cols="30"
                rows="1"
                className="w-full p-2 rounded shadow-lg outline-none border-none resize-none overflow-hidden text-xs md:text-sm"
              />
            </section>

            {/* Description Field */}
            <section className="flex flex-col justify-center items-start gap-2 w-full">
              <label htmlFor="title" className="text-sm md:text-base font-bold">
                Description
              </label>
              <textarea
                name="description"
                value={noteData.description}
                onChange={handleChange}
                ref={descriptionInputRef}
                id="description"
                placeholder="Note something down"
                cols="30"
                rows="10"
                className="w-full p-2 rounded shadow-lg outline-none border-none resize-none overflow-hidden text-xs md:text-sm"
              />
            </section>
          </div>
        </>
      ) : null}
    </>
  );
};

// PropTypes Validation for Modal Component
Modal.propTypes = {
  allNotes: PropTypes.array,
  handleModal: PropTypes.bool,
  closeNote: PropTypes.func,
  noteData: PropTypes.object,
  setNoteData: PropTypes.func,
  setAllNotes: PropTypes.func,
  currentNoteId: PropTypes.number,
};

export default Modal;
