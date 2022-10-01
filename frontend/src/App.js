
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import {Home, Roles,Courses, SkillAssignment, EasterEgg} from "./pages"
import * as ROUTES from './constants/routes.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path={ROUTES.HOME} element={<Home />} exact></Route>
      <Route path={ROUTES.ROLES} element={<Roles />}></Route>
      <Route path={ROUTES.COURSES} element={<Courses />}></Route>
      <Route path={ROUTES.SKILLASSIGNMENT} element={<SkillAssignment />}></Route>
      <Route path={ROUTES.EASTEREGG} element={<EasterEgg />}></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
