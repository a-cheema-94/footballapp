import { Card, Stack } from "react-bootstrap";
import { NewsType } from "../../../../queries/types/queryTypes";
import { CSSProperties } from "react";

type Props = {
  story: NewsType;
};

// TODO => make date

const FootballNewsStory = ({ story }: Props) => {
  return (
    <>
      {
        <Stack
          className="gap-2 border shadow p-3 rounded"
          style={{
            maxWidth: "20em",
          }}
        >
          {/* image */}
          <img
            src={story.urlToImage}
            width="100%"
            className="object-fit-contain border rounded"
          />

          {/* source */}
          <p>Four Four Two</p>

          {/* text */}
          <div className="d-flex flex-column w-100 news-story-container">
            <h2>{story.title}</h2>
            <div className="d-flex gap-2 ">
              <p className="fw-lighter">3 hours ago</p>
              <p>By {story.author}</p>
            </div>
          </div>
        </Stack>
      }
    </>
  );
};

export default FootballNewsStory;
