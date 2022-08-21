import {NowRequest, NowResponse} from '@vercel/node';
import {getJuejinArticles} from '../../../util/requestArticles';
import {generateSvg} from "../../../util/utils";

export default async (req: NowRequest, res: NowResponse) => {
    const {
        query: {id, index, width, height, hideDate, hideImage, imageUrl, imageWidth},
        headers,
    } = req;

    const responseArticles = await getJuejinArticles(id);

    return await generateSvg(index,
        width, height, hideImage, hideDate, imageUrl, imageWidth,
        responseArticles, headers, res);
};
