import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import RootPage from "./root-page";
import Main from "./main";
import Provision from "./provision";



const router = createBrowserRouter(createRoutesFromElements(
  <Route path={'/'} element={<RootPage />}>
    <Route index element={<Main/>}/>
    <Route path="/provision/:id" element={<Provision />} />
  </Route>
))

function AppRouter() {
  return (<RouterProvider router={router} />)
}

export default AppRouter;