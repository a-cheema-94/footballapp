import { Stack } from "react-bootstrap";
import { NewsType } from "../../../../queries/types/queryTypes";
import { convertPublishedAtString } from "../../../../functions/partArray";

type Props = {
  story: NewsType;
  noImage?: boolean;
  largeConfig?: boolean;
  smallImage?: boolean;
};

const FootballNewsStory = ({ story, noImage, largeConfig }: Props) => {
  const resetLinkStyles = {
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <>
      {
        <a
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit article site (Four Four Two article opened in new tab)"
          style={resetLinkStyles}
        >
          <Stack
            className="gap-2 border shadow p-3 rounded"
            // 40em at large screens with images and 20em at smaller screen sizes. 30em for large screens with no images.
            style={{
              maxWidth: `${largeConfig ? (noImage ? "30em" : "40em") : "20em"}`,
            }}
          >
            {/* image */}
            {!noImage && (
              <img
                src={story.urlToImage}
                width="100%"
                className="object-fit-contain border rounded"
              />
            )}

            {/* source */}
            <p>Four Four Two</p>

            {/* text */}
            <div
              className={`d-flex flex-column w-100 news-story-container ${
                largeConfig ? "large-screen" : ""
              }`}
            >
              <h2>{story.title}</h2>
              <div className="d-flex gap-2 ">
                <p className="fw-lighter">{convertPublishedAtString(story.publishedAt) ?? ''}</p>
                <p>By {story.author}</p>
              </div>
            </div>
          </Stack>
        </a>
      }
    </>
  );
};

export default FootballNewsStory;
