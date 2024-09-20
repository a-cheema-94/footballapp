import { getLogosAndImages } from "../../../../functions/logoFunction";
import { PlayerType } from "../../../../queries/types/queryTypes";
import CircularImageContainer from "../../../reusable/CircularImageContainer";
import PlayerCard from "./PlayerCard";

type Props = {
  player: PlayerType
};

const TopPlayerInfo = ({ player }: Props) => {

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