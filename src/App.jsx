import { createPortal } from "react-dom";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Modal from "./Components/Modal";
import AllNotes from "./Components/AllNotes";
import Landing from "./Components/Landing";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";

library.add(fas);

function App() {
  const [allNotes, setAllNotes] = useState([]);

  let curNoteId = allNotes[0] ? allNotes[0].id : "";
  const [currentNoteId, setCurrentNoteId] = useState(curNoteId);
  const [openNewNoteModal, setOpenNewNoteModal] = useState(false);
  const [noteData, setNoteData] = useState({ title: "", description: "" });

  let notes = allNotes.map((note, index) => {
    return (
      <div
        key={index}
        className="flex justify-between items-center bg-white p-3 rounded-xl shadow-lg w-full md:w-1/2 cursor-pointer"
      >
        <div className="flex flex-col justify-center items-start gap-2">
          <h4 className="text-xs font-bold">{note.title}</h4>
          <p className="text-[10px] text-zinc-400">
            {note.description.slice(0, 31) + "..."}
          </p>
        </div>
        <div className="flex flex-col justify-center items-start gap-2">
          <p className="text-[10px] self-end">{note.menu}</p>
          <h4 className="text-[10px] font-bold">{note.date}</h4>
        </div>
      </div>
    );
  });

  function openNewNote() {
    setOpenNewNoteModal(true);
    noteData.title = "";
    noteData.description = "";
  }

  function closeNewNote() {
    setOpenNewNoteModal(false);
  }

  return (
    <div className="relative">
      <Landing />
      <AllNotes notes={notes} openNewNote={openNewNote} />
      {createPortal(
        <Modal
          allNotes={allNotes}
          openNewNoteModal={openNewNoteModal}
          closeNewNote={closeNewNote}
          noteData={noteData}
          setNoteData={setNoteData}
          setAllNotes={setAllNotes}
          setCurrentNoteId={setCurrentNoteId}
        />,
        document.getElementById("portal")
      )}
    </div>
  );
}

export default App;
