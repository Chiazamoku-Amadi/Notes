import { createPortal } from "react-dom";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Modal from "./Components/Modal";
import AllNotes from "./Components/AllNotes";
// import Landing from "./Components/Landing";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";

library.add(fas);

function App() {
  const [allNotes, setAllNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [handleModal, setHandleModal] = useState(false);
  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
  });

  let notes = allNotes.map((note, index) => {
    return (
      <div
        key={index}
        className={`flex justify-between items-center ${
          index == currentNoteId ? "bg-[#B931FC]" : "bg-white"
        } p-3 rounded-xl shadow-lg w-full md:w-1/2 cursor-pointer`}
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
        <div className="flex flex-col justify-center items-start gap-2">
          <p className="text-[10px] self-end">{note.menu}</p>
          <h4 className="text-[10px] font-bold">{note.date}</h4>
        </div>
      </div>
    );
  });

  function openNote(id) {
    setCurrentNoteId(id);
    setHandleModal(true);
    setNoteData(id !== null ? allNotes[id] : { title: "", description: "" });
  }

  function closeNote() {
    setHandleModal(false);
    setNoteData({ title: "", description: "" });
  }

  return (
    <div className="relative">
      {/* <Landing /> */}
      <AllNotes notes={notes} openNote={openNote} />
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
