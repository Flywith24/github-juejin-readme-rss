import {convertImg, readingTimeCalc} from "../util/utils";

export const ArticleCard = async (data, hideImage?, imageUrl?, hidDate?, imageW?) => {
    const {link, title, pubDate, content, thumbnail} = data
    const readingTime = readingTimeCalc(content);
    const url = imageUrl !== undefined && imageUrl != null ? await convertImg(imageUrl) : thumbnail
    const dateStyle = hidDate === "true" ? "display: none" : ""
    let imageStyle = "width: " + imageW + "px;"
    imageStyle = hideImage === "true" ? imageStyle + " display: none" : imageStyle

    console.log("imageStyle " + imageStyle)
    return `
<svg fill="none" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink">
	<foreignObject width="100%" height="100%">
		<div xmlns="http://www.w3.org/1999/xhtml"
		xmlns:xlink="http://www.w3.org/1999/xlink">
			<style>
				*{
          margin: 0;
          padding: 0;
          width: 100%;
          box-sizing: border-box;
          font-family: sans-serif
				}
        @keyframes gradientBackground {
					0% {
						background-position-x: 0%;
					}
					100% {
						background-position-x: 100%;
					}
				}
				.flex {
					display: flex;
					align-items:center;
        }
        .outer-container{
          height:100px;
        }
				.container{
          height: 98px;
          border: 1px solid rgba(0,0,0,.2);
          padding: 10px 20px;
          border-radius: 10px;
          background: rgb(255,255,255);
          background: linear-gradient(60deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 47%, rgba(246,246,246,1) 50%, rgba(255,255,255,1) 53%, rgba(255,255,255,1) 100%);
          background-size: 600% 400%;
          animation: gradientBackground 3s ease infinite;
          overflow: hidden;
          text-overflow: ellipsis;
				}
        img {
          margin-right: 10px;
          width: 10px;
          height: 100%;
          object-fit: contain;
        }
        .right{
          flex: 1;
        }
        a{
          text-decoration: none;
          color: inherit
        }
        p {
          line-height: 1.5;
          color: #555
        }
        h3{
        word-wrap: break-word;
          color: #333
        }
        small{
          color: #888;
          display: block;
          margin-top: 5px;
          margin-bottom: 8px
        }
				
			</style>
      <div class="outer-container flex">
        <a class="container flex" xlink:href="${link}" target="__blank">
          <img src="${url}" alt="" style="${imageStyle}"/>
          <div class="right">
            <h3>${title}</h3>
            <small style="${dateStyle}">${pubDate} · ${readingTime}</small>
          </div>
		</a>
      </div>
	</div>
	</foreignObject>
</svg>
`;
};
