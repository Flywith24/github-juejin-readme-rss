import {NowRequest, NowResponse} from '@vercel/node';
import {getArticle} from '../../util/juejin';
import juejin from '../../assets/juejin';

export default async (req: NowRequest, res: NowResponse) => {
    const {
        query: { index },
        headers,
    } = req;

    const {title, url, date, description} = await getArticle(index);

    const dest = headers['sec-fetch-dest'] || headers['Sec-Fetch-Dest'];
    const accept = headers['accept'];
    const isImage = dest ? dest === 'image' : !/text\/html/.test(accept);

    if (isImage) {
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
        res.setHeader('Content-Type', 'image/svg+xml');
        // res.setHeader('Cache-Control', 'no-cache');

        return res.send(
            juejin({
                title,
                url,
                date,
                description,
            })
        );
    }

    res.writeHead(301, {Location: url});
    res.end();
};
