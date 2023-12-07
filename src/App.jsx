import { createPortal } from "react-dom";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Modal from "./Components/Modal";
import AllNotes from "./Components/AllNotes";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas, far);

function App() {
  const [allNotes, setAllNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [handleModal, setHandleModal] = useState(false);
  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
  });
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const allNotesSelected = selectedNotes.length === allNotes.length;
    setSelectAll(allNotesSelected);
  }, [selectedNotes, allNotes]);

  const filteredNotes = allNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  let notes = filteredNotes.map((note, index) => {
    return (
      <div
        key={index}
        className={`note relative flex justify-between items-center ${
          index == currentNoteId ? "bg-[#B931FC]" : "bg-white"
        } hover:bg-zinc-200 p-3 rounded-xl shadow-lg w-full md:w-1/2 cursor-pointer z-0`}
        onClick={() => {
          openNote(index);
        }}
      >
        <div className="flex flex-col justify-center items-start gap-2">
          <h4 className="text-xs font-bold">{note.title}</h4>
          <p
            className={`text-[10px] ${
              index == currentNoteId ? "text-white" : "text-zinc-400"
            } `}
          >
            {note.description.length <= 31
              ? note.description
              : note.description.slice(0, 31) + "..."}
          </p>
        </div>
        <div className="flex flex-col justify-center items-end gap-2">
          <h4 className="text-[10px] font-bold">{note.date}</h4>
          <div className="flex justify-center items-center gap-4">
            {selectedNotes.length === 0 && (
              // Icon for deleting individual note
              <FontAwesomeIcon
                icon="fa-regular fa-trash-can"
                size="xs"
                onClick={(event) => deleteNote(index, event)}
                className="delete icons"
              />
            )}

            {/* Checkbox for individual note selection  */}
            <input
              type="checkbox"
              onClick={(e) => e.stopPropagation()}
              onChange={(event) => handleIsSelected(index, event)}
              checked={selectedNotes.includes(index)}
              className="justify-self-end cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  });

  function handleSearch(event) {
    setSearchQuery(event.target.value.toLowerCase());
  }

  function openNote(index) {
    setHandleModal(true);
    setCurrentNoteId(index);
    setNoteData(
      index !== null ? allNotes[index] : { title: "", description: "" }
    );
  }

  function closeNote() {
    setHandleModal(false);
    setCurrentNoteId(null);
    setNoteData({ title: "", description: "" });
  }

  // Handles selection of notes
  function handleIsSelected(index) {
    // Checks if all notes are selected
    if (index === "all") {
      setSelectAll(!selectAll);
      // If selectAll is true, deselect all. Else, select all notes.
      setSelectedNotes(selectAll ? [] : allNotes.map((_, index) => index));
    }
    // For individual notes
    else {
      // Checks if the note with "index" is already selected
      const isSelected = selectedNotes.includes(index);
      setSelectedNotes(
        // If the note is already selected, deselect it. Else, select it.
        isSelected
          ? selectedNotes.filter((selected) => selected !== index)
          : [...selectedNotes, index]
      );
    }
  }

  function deleteNote(index, event) {
    event.stopPropagation();
    const newNotes = [...allNotes];
    newNotes.splice(index, 1);
    setAllNotes(newNotes);
  }

  function deleteSelectedNotes() {
    // Creates a new array containing all unselected notes
    const newNotes = allNotes.filter(
      (_, index) => !selectedNotes.includes(index)
    );
    // Sets all notes array to the unselected notes array
    setAllNotes(newNotes);
    // Clears the selected notes array
    setSelectedNotes([]);
    // Unchecks the select all checkbox
    setSelectAll(false);
  }

  return (
    <div className="relative">
      <AllNotes
        notes={notes}
        openNote={openNote}
        selectedNotes={selectedNotes}
        selectAll={selectAll}
        handleIsSelected={handleIsSelected}
        deleteSelectedNotes={deleteSelectedNotes}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
      />
      {createPortal(
        <Modal
          allNotes={allNotes}
          handleModal={handleModal}
          closeNote={closeNote}
          noteData={noteData}
          setNoteData={setNoteData}
          setAllNotes={setAllNotes}
          currentNoteId={currentNoteId}
        />,
        document.getElementById("portal")
      )}
    </div>
  );
}

export default App;
