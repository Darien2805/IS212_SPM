
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import {Home, Roles,Courses,SkillMaintenance,CreateSkill,EasterEgg} from "./pages"
import * as ROUTES from './constants/routes.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path={ROUTES.HOME} element={<Home />} exact></Route>
      <Route path={ROUTES.ROLES} element={<Roles />}></Route>
      <Route path={ROUTES.COURSES} element={<Courses />}></Route>
      <Route path={ROUTES.SKILLMAINTENANCE} element={<SkillMaintenance />}></Route>
      <Route path={ROUTES.CREATESKILL} element={<CreateSkill />}></Route>
      <Route path={ROUTES.EASTEREGG} element={<EasterEgg />}></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
