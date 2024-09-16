import { Card } from "react-bootstrap";
import { getLogosAndImages } from "../../../../functions/logoFunction";

type Props = {
  player: any;
};

const PlayerCard = ({ player }: Props) => {
  return (
    <Card className="rounded" style={{ width: '150px' }}>
      <Card.Img
        variant="top"
        src={getLogosAndImages("players", player?.general.id ?? 1)}
      />
      <Card.Body>
        <Card.Text className="fw-semibold">{player.general.name}</Card.Text>
        <div className="d-flex gap-2 justify-content-center align-items-center w-50 ms-4">
          <Card.Img
            className="w-50"
            src={getLogosAndImages("teams", player?.statistics.team.id ?? 1)}
          />
          <Card.Text>{player.statistics.team.name}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PlayerCard;
