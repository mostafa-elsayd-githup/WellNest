import { Outlet } from "react-router";
import Sidbar from "./components/sidebar/sidbar";
import Header from "./components/sidebar/header/head";

function Layout() {
  return (
   <div className="flex h-screen w-full overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      <Sidbar />
      <main className="flex-1 overflow-y-auto p-6">
        <Header/>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
