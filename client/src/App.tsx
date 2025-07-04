import Club from "./components/Pages/Club/Club";
import Competition from "./components/Pages/Competition/Competition";
import Homepage from "./components/Pages/Homepage/Homepage";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LiveMatchStats from "./components/Pages/MatchStats/LiveMatchStats/LiveMatchStats";
import { Route, Routes } from "react-router-dom";
import MainNavbar from "./components/Navbar/MainNavbar";
import { useContext, useEffect, useState } from "react";
import SearchPage from "./components/Navbar/searchPage/SearchPage";
import NavigateUpBtn from "./components/NavigateUpBtn";
import { ThemeContext } from "./context/ThemeProvider";
import ErrorPage from "./ErrorPage";

function App() {
  // search state and functions
  const [search, setSearch] = useState<boolean>(false);
  const toggle = () => setSearch((prevSearch) => !prevSearch);
  const close = () => setSearch(false);

  // theme context
  const { theme } = useContext(ThemeContext);

  // up nav button state
  const [showNavUpBtn, setShowNavUpBtn] = useState<boolean>(false);

  // use useEffect to clean up scroll event listener and not add it to global event listener.
  useEffect(() => {
    const scrollFunction = () => {
      if (document.documentElement.scrollTop > 40) {
        setShowNavUpBtn(true);
      } else {
        setShowNavUpBtn(false);
      }
    };

    document.addEventListener("scroll", scrollFunction);

    return () => document.removeEventListener("scroll", scrollFunction);
  }, []);


  return (
    <div className={`${theme === "light" ? "bg-gray-100" : "bg-dark"}`}>
      <div className="mw-100 mx-auto">
        <MainNavbar toggle={toggle} closeSearch={close}/>
      </div>
      <div style={{ paddingTop: `75px`, overflowY: 'hidden' }}>
        {search && <SearchPage search={search} close={close} />}
        {!search && (
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/competition/" element={<Competition />} />
            <Route path="/club" element={<Club />} />
            <Route path="/liveMatchStats/:fixtureId" element={<LiveMatchStats />} />
            {/* <Route path="/liveMatchStats" element={<LiveMatchStats />} /> */}
            {/* IN PROGRESS */}
            {/* <Route path="/player" element={<Player />} /> */}
            {/* <Route
              path="/fullTimeMatchStats"
              element={<FullTimeMatchStats />}
            /> */}
            <Route path="*" element={<ErrorPage />}/>
          </Routes>
        )}

        
        {showNavUpBtn && <NavigateUpBtn />}
      </div>
    </div>
  );
}

export default App;
