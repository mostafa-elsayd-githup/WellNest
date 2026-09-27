import { Outlet } from "react-router";
import Sidebar from "./components/sidebar/sidebar";
import Header from "./components/sidebar/header/head";

function Layout() {
  return (
   <div className="flex h-screen w-full overflow-hidden bg-(--bg) text-(--text)">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <Header/>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
