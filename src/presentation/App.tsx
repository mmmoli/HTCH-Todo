import "./App.css";
import { NoteList } from "./components";
import { useAtom } from "jotai";
import { notesMachineAtom } from "./machines/notesMachine";

function App() {
  const [state] = useAtom(notesMachineAtom);
  return (
    <>
      <pre>{JSON.stringify(state.value)}</pre>
      <NoteList />
    </>
  );
}

export default App;
