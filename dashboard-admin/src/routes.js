import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import Users from "views/Users.js";
import Products from "views/Products.js";
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import AddUser from "views/AddUSer";
import AddProduct from "./views/AddProduct";

const dashboardRoutes = [

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
    path: "/addProduct",
    name: "Add product",
    icon: "nc-icon nc-chart-pie-35",
    component: AddProduct,
    layout: "/admin",
  },
  {
    path: "/users/all",
    name: "Users",
    icon: "nc-icon nc-notes",
    component: Users,
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
