import "./App.css";
import Create from "./components/Create";
import Read from "./components/Read";
import Update from "./components/Update";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import All_Components from './components/All_Components'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="" element={<Create />} />
          <Route path="/read" element={<Read />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </Router>
    </>
  );
  // <All_Components/>
  // {/* <All_Components/> */}
}

export default App;
