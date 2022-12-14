
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import {Home, Roles, Courses, SkillMaintenance, SkillAssignment, CreateSkill, LearningJourney, RoleMaintenance, CreateRole, UpdateRole, SelectSkills,EditSkill, UpdateJourney} from "./pages"
import * as ROUTES from './constants/routes.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path={ROUTES.HOME} element={<Home />} exact></Route>
      <Route path={ROUTES.ROLES} element={<Roles />}></Route>
      <Route path={ROUTES.COURSES} element={<Courses />}></Route>
      <Route path={ROUTES.SKILLASSIGNMENT} element={<SkillAssignment />}></Route>
      <Route path={ROUTES.SKILLMAINTENANCE} element={<SkillMaintenance />}></Route>
      <Route path={ROUTES.CREATESKILL} element={<CreateSkill />}></Route>
      <Route path={ROUTES.LEARNINGJOURNEY} element={<LearningJourney />}></Route>
      <Route path={ROUTES.SELECTSKILLS} element={<SelectSkills />}></Route>
      <Route path={ROUTES.ROLEMAINTENANCE} element={<RoleMaintenance />}></Route>
      <Route path={ROUTES.CREATEROLE} element={<CreateRole />}></Route>
      <Route path={ROUTES.EDITSKILL} element={<EditSkill />}></Route>
      <Route path={ROUTES.UPDATEROLE} element={<UpdateRole />}></Route>
      <Route path={ROUTES.UPDATEJOURNEY} element={<UpdateJourney/>}></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
