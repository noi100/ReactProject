import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store, persistor } from './Store/store.js'; // הוספנו את persistor
import Home from './components/Home';
import Login from './components/Login';
import { Provider } from 'react-redux';
import AllProject from './components/AllPage.jsx';
import AddProject from './components/AddProject.jsx';
import { PersistGate } from 'redux-persist/integration/react'; // ייבוא ה-Gate
import ProjectItem from "./components/ProjectItem";
import TaskItem from './components/TaskItem.jsx';

function App() {
  return (
    <Provider store={store}>
      {/* ה-PersistGate דואג שהאפליקציה לא תטען לפני שהנתונים חזרו מהזיכרון */}
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/AllProject" element={<AllProject/>}/>
            <Route path='/AddProject' element={<AddProject/>}/>
            <Route path="/projects" element={<AllProject />} />
            <Route path="/project/:id" element={<ProjectItem />} />
            <Route path="/TaskItem" element={<TaskItem/>}/>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;