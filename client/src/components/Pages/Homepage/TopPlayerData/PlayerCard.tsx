import { Card } from "react-bootstrap";
import { getLogosAndImages } from "../../../../functions/logoFunction";
import { PlayerType } from "../../../../queries/types/queryTypes";

type Props = {
  player: PlayerType;
};

const PlayerCard = ({ player }: Props) => {
  return (
    <Card className="rounded" style={{ width: "200px", fontSize: ".85rem" }}>
      <div className="row g-0">
        <div className="col-6 align-self-end">

        <Card.Img
          src={getLogosAndImages("players", player?.general.id ?? 1)}
        />
        </div>
        <div className="col-6">

        <Card.Body className="ps-1">
          <Card.Text
            className="fw-semibold text-center"
            style={{ fontSize: ".95em" }}
          >
            {player.general.name}
          </Card.Text>
          <div className="d-flex align-items-center gap-1">
            <Card.Img
              className=""
              src={getLogosAndImages("teams", player?.statistics.team.id ?? 1)}
              style={{
                width: "30px",
                height: "30px",
                objectFit: "contain",
                objectPosition: "center",

              }}
            />
            <Card.Text
              title={player.statistics.team.name}
              className="w-100 homepage-playerData-text"
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                fontSize: ".8em",
              }}
            >
              {player.statistics.team.name}
            </Card.Text>
          </div>
        </Card.Body>
        </div>
      </div>
    </Card>
  );
};

export default PlayerCard;
