import { Card, Stack } from "react-bootstrap";
import { NewsType } from "../../../../queries/types/queryTypes";
import { CSSProperties } from "react";

type Props = {
  story: NewsType;
};

const FootballNewsStory = ({ story }: Props) => {


  return (
    <Stack
      direction="vertical"
      className="gap-2 border border-black p-3 my-4 mx-auto rounded w-75"
      
    >

        {/* image */}
        <img src={story.urlToImage} width="100%" className="object-fit-contain border rounded"/>

        {/* text */}
        <div className="d-flex flex-column w-100 news-story-container" >
          <h6 style={{ maxHeight: '20%' }}>{story.title}</h6>
          <div className="d-flex gap-2">
            <p>3 hours ago</p>
            <p>{story.author}</p>
          </div>
        </div>

    </Stack>
  );
};

export default FootballNewsStory;
