import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/Users.js";
import Products from "views/Products.js";
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import AddUser from "views/AddUSer";

const dashboardRoutes = [
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/admin",
  // },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/Products",
    name: "Products",
    icon: "nc-icon nc-paper-2",
    component: Products,
    layout: "/admin",
  },
  {
    path: "/users/all",
    name: "Users",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
  },
  
  {
    path: "/edit",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  
  
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin",
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/adduser",
    name: "AddUser",
    icon: "nc-icon nc-single-02",
    component: AddUser,
    layout: "/admin",
  },
  
];

export default dashboardRoutes;
