import {NowRequest, NowResponse} from '@vercel/node';
import {getXiaozhuanlanArticles} from '../util/requestArticles';
import {generateSvg} from "../util/utils";


export default async (req: NowRequest, res: NowResponse) => {
    const {
        query: {id, limit},
        headers,
    } = req;

    let articles = []
    const responseArticles = await getXiaozhuanlanArticles(id);

    return await generateSvg(limit, articles, responseArticles, headers, res);
};