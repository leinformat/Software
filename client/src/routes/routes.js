import { Home } from "../pages/Home";

export const routes = [
  {
    name: "Inicio",
    path: "/",
    component: Home,
    icon: '',
  },
  {
    name: "Next +",
    path: "/next-plus",
    component: Home,
    icon: '',
    subItems: [
      {name:"Empresa",icon:"", path:"/company",component: Home, }
    ]
  },
];