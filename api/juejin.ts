import {NowRequest, NowResponse} from '@vercel/node';
import {getJuejinArticles} from '../util/requestArticles';
import {composeSvg} from "../util/utils";

export default async (req: NowRequest, res: NowResponse) => {
    const {
        query: {id, limit, width, height, hideDate, hideImage, imageUrl, imageWidth},
        headers,
    } = req;

    let articles = []
    const responseArticles = await getJuejinArticles(id);

    return await composeSvg(limit,
        width, height, hideImage, hideDate, imageUrl, imageWidth,
        articles, responseArticles, headers, res
    );
};
