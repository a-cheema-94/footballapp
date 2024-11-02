import { Card } from "react-bootstrap";
import { PlayerType } from "../../../../queries/types/queryTypes";
import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeProvider";
import LogoOrPlayerImage from "../../../reusable/LogoOrPlayerImage";

type Props = {
  player: PlayerType;
};

const PlayerCard = ({ player }: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Card
      className={`rounded ${
        theme === "light" ? "bg-gray-200" : "bg-dark-dark"
      }  p-1`}
      style={{ width: "200px", fontSize: ".85rem" }}
    >
      <div className="row g-0">
        <div className="col-6 align-self-end">
          <LogoOrPlayerImage
            category="players"
            dimension="100%"
            id={player?.general.id ?? 1}
            optionalClasses="rounded"
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
              <LogoOrPlayerImage
                category="teams"
                dimension="30px"
                id={player?.statistics.team.id ?? 1}
              />

              <Card.Text
                title={player.statistics.team.name}
                className="w-100 homepage-playerData-text text-truncate"
                style={{
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
