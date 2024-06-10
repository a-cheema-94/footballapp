import Club from "./components/Pages/Club/Club";
import Competition from "./components/Pages/Competition";
import Homepage from "./components/Pages/Homepage/Homepage"
import 'bootstrap/dist/css/bootstrap.min.css';
import Player from "./components/Pages/Player";
import LiveMatchStats from "./components/Pages/MatchStats/LiveMatchStats/LiveMatchStats";
import FullTimeMatchStats from "./components/Pages/MatchStats/FullTimeMatchStats/FullTimeMatchStats";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      
    <Navbar />

    <Routes>

      <Route path="/" element={<Homepage />}/>
      <Route path="/competition" element={<Competition />}/>
      <Route path="/club" element={<Club />}/>
      <Route path="/player" element={<Player />}/>
      <Route path="/liveMatchStats" element={<LiveMatchStats />}/>
      <Route path="/fullTimeMatchStats" element={<FullTimeMatchStats />}/>
    </Routes>
     {/* <Homepage /> */}
     {/* <Competition /> */}
     {/* <Club /> */}
     {/* <Player /> */}
     {/* <LiveMatchStats /> */}
     {/* <FullTimeMatchStats /> */}
    </>
  )
}

export default App
