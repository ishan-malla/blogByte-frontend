import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div>
      <Navbar></Navbar>
      <main className="p-4">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
}
