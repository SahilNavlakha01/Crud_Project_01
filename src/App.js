import "./App.css";
import Create from "./components/Create";
import Read from "./components/Read";
import Update from "./components/Update";
import { Provider } from "react-redux";
import store from "./components/app/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>   
    <Provider  store={store}>   
      <Router>
        <Routes>
          <Route path="" element={<Create />} />
          <Route path="/read" element={<Read />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </Router> 
      </Provider>
    </>
  );
  // <All_Components/>
  // {/* <All_Components/> */}
}

export default App;
