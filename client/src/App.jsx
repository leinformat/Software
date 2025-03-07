import { Auth } from "./layout/auth/Auth";
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from "./layout/dashboard/Dashboard";
import { routes } from "./routes/routes";

function App() {

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Dashboard />}>
        {routes.map((route, key) => {
          return !route.subItems 
          ? <Route path={route.path} element={<route.component />} key={key} />
          : route.subItems.map((subItem)=>(<Route path={route.path+subItem.path} element={<subItem.component />} key={key} />))
        })}
        <Route path="/*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;