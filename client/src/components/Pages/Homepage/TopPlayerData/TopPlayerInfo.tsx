import { getLogosAndImages } from "../../../../functions/logoFunction";
import CircularImageContainer from "../../../reusable/CircularImageContainer";
import PlayerCard from "./PlayerCard";

// TODO: sort out player type.
type Props = any;

const TopPlayerInfo = ({ player }: Props) => {
  // console.log(player?.general.id)

  // TODO: sort out top player query on front end so it requests all stats that are wanted.

  return (
    <tr className="d-flex gap-2 ">
      <td className="d-flex flex-column align-items-center gap-1 text-center">
        {/* player card */}
        <PlayerCard player={player}/>
      </td>
      <td>
        {player.statistics.goals.total}
      </td>
      <td>
        {player.statistics.goals.assists}
      </td>
      
    </tr>
  );
};

export default TopPlayerInfo;

// <tr>
{
  /* <th>Name</th>
<th>Club</th>
<th>Goals</th>
<th>Assists</th>
<th>Successful Dribbles</th>
<th>Appearances</th>
<th>Passes (Total / Accuracy)</th>
<th>Shots (Total / On Target)</th>
</tr> */
}
