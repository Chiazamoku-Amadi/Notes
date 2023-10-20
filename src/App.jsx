import { fas } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import AllNotes from "./Components/AllNotes/AllNotes";
// import Landing from "./Components/Landing/Landing";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(fas);

function App() {
  return (
    <>
      {/* <Landing /> */}
      <AllNotes />
    </>
  );
}

export default App;
