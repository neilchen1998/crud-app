import { useState, FC } from "react";
// import { invoke } from "@tauri-apps/api/core";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import FilePage from "./pages/FilePage";
import ParameterPage from "./pages/ParameterListPage";
import MainContent from "./components/MainContent";
import "./styles/App.css";

interface Page {
  name: string,
  component: FC;
}

function App() {

  const [currentPage, setCurrentPage] = useState("Home");

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  }

  const pages: Page[] = [
    {name: "Home", component: HomePage},
    {name: "File", component: FilePage},
    {name: "Parameter", component: ParameterPage},
  ];

  const currentPageComponent = pages.find((page) => page.name === currentPage)?.component || (() => <div>Page Not Found</div>);

  return (
    <div className="container">
      <Sidebar
        pages={pages}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        />
      <MainContent
        currentPageComponent={currentPageComponent}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;
