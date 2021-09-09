import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { Profile } from "./pages/Profile/Profile";
import { TeamsList } from "./pages/TeamsList/TeamsList";
import { Team } from "./pages/Team/Team";
import { EventProfile } from "./pages/EventProfile/EventProfile";
import { SignUp } from "./pages/SignUp/SignUp";
import { AdminPanel } from "./pages/AdminPanel/AdminPanel";
import { CreateEvent } from "./pages/AdminPanel/CreateEvent/CreateEvent";
import { ChgkPanel } from "./pages/AdminPanel/Game/Chgk/ChgkPanel";

export const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/my",
    component: Profile,
  },
  {
    path: "/teams",
    component: TeamsList,
  },
  {
    path: "/team/:id",
    component: Team,
  },
  {
    path: "/event/:id",
    component: EventProfile,
  },
  {
    path: "/signup",
    component: SignUp,
  },
  {
    path: "/admin",
    component: AdminPanel,
    routes: [
      {
        path: "/admin/create/event",
        component: CreateEvent,
      },
      {
        path: "/admin/event/:id/accounting",
        component: ChgkPanel,
        exact: true,
      },
    ],
  },
];
