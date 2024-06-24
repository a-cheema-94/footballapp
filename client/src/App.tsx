import Club from "./components/Pages/Club/Club";
import Competition from "./components/Pages/Competition";
import Homepage from "./components/Pages/Homepage/Homepage"
import 'bootstrap/dist/css/bootstrap.min.css';
import Player from "./components/Pages/Player";
import LiveMatchStats from "./components/Pages/MatchStats/LiveMatchStats/LiveMatchStats";
import FullTimeMatchStats from "./components/Pages/MatchStats/FullTimeMatchStats/FullTimeMatchStats";
import { Route, Routes } from "react-router-dom";
import MainNavbar from "./components/Navbar/MainNavbar";
import { useState } from "react";
import SearchPage from "./components/Navbar/SearchPage";

function App() {
  const [search, setSearch] = useState(false);
  const toggle = () => setSearch(prevSearch => !prevSearch);
  
  const close = () => setSearch(false)


  return (
    <>
      
    <MainNavbar toggle={toggle}/>
    <SearchPage search={search} close={close}/>

    <Routes>

      <Route path="/" element={<Homepage />}/>
      <Route path="/competition" element={<Competition />}/>
      <Route path="/club" element={<Club />}/>
      <Route path="/player" element={<Player />}/>
      <Route path="/liveMatchStats" element={<LiveMatchStats />}/>
      <Route path="/fullTimeMatchStats" element={<FullTimeMatchStats />}/>
    </Routes>
    </>
  )
}

export default App
