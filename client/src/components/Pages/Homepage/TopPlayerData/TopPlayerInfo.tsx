import { getLogosAndImages } from "../../../../functions/logoFunction";
import CircularImageContainer from "../../../reusable/CircularImageContainer";
import PlayerCard from "./PlayerCard";

// TODO: sort out player type.
type Props = {
  player: any
};

const TopPlayerInfo = ({ player }: Props) => {

  // style={{
  //   textOverflow: "ellipsis",
  //   whiteSpace: "nowrap",
  //   overflow: "hidden",
  //   fontSize: ".8em",
  // }}

  return (
    <tr className="text-center text-nowrap fw-normal fs-6" style={{ verticalAlign: 'middle' }}>
      <td className="">
        {/* player card */}
        <PlayerCard player={player}/>
      </td>
      <td className="">
        {player.statistics.goals.total}
      </td>
      <td>
        {player.statistics.goals.assists}
      </td>
      <td>
        {player.statistics.dribbles.success ?? 'n / a'}
      </td>
      <td>
        {player.statistics.games.appearences}
      </td>
      <td>
        {player.statistics.passes.total} / {player.statistics.passes.accuracy} %
      </td>
      <td>
        {player.statistics.shots.total} / {player.statistics.shots.on} %
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
