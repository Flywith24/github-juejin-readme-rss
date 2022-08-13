import {NowRequest, NowResponse} from '@vercel/node';
import {getJuejinArticles} from '../../../util/requestArticles';
import {generateSvg} from "../../../util/utils";

export default async (req: NowRequest, res: NowResponse) => {
    const {
        query: {id, index},
        headers,
    } = req;

    const responseArticles = await getJuejinArticles(id);

    return await generateSvg(index, responseArticles, headers, res);
};
