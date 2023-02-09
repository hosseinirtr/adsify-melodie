import {  Outlet } from "react-router-dom";
import Header from "../paritial/header";

import Sidebar from "../paritial/sidebar";
export default function Root() {
  return (
    <>
      <Sidebar />
      <div id="detail">
        <Header />
        <Outlet />
      </div>
    </>
  );
}
