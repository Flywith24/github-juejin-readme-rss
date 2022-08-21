import axios from "axios";
import {ArticleCard} from "../assets/articleCard";
import {NowResponse, VercelResponse} from "@vercel/node";

const ansiWordBound = (c) => (
    (' ' === c) ||
    ('\n' === c) ||
    ('\r' === c) ||
    ('\t' === c)
);

export const readingTimeCalc = (text) => {
    let words = 0;
    let start = 0;
    let end = text.length - 1;
    let i;

    const wordsPerMinute = 200;

    while (ansiWordBound(text[start])) start++
    while (ansiWordBound(text[end])) end--

    for (i = start; i <= end;) {
        for (; i <= end && !ansiWordBound(text[i]); i++) ;
        words++
        for (; i <= end && ansiWordBound(text[i]); i++) ;
    }

    const minutes = words / wordsPerMinute;
    const displayed = Math.ceil(Number(minutes.toFixed(2)));

    return `${displayed} min read`;
}

export const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
};


export async function composeSvg(
    limit: string | string[],
    width: string | string[],
    height: string | string[],
    hideImage: string | string[],
    hideDate: string | string[],
    imageUrl: string | string[],
    imageWidth: string | string[],
    articles: any[],
    responseArticles: any[],
    headers,
    res: NowResponse & {
        send: (body: any) => VercelResponse; json: (jsonBody: any) => VercelResponse; status: (statusCode: number) => VercelResponse; redirect: (statusOrUrl: (string | number), url?: string) => VercelResponse
    }) {
    if (limit) {
        articles = [...responseArticles.slice(0, Number(limit))];
    } else {
        articles = [responseArticles[0]];
    }

    const w = width !== undefined ? String(width) : "700";
    const h = height !== undefined ? Number(height) : 120
    const hideD = hideDate !== undefined ? hideDate : false
    const hideImg = hideImage !== undefined ? hideImage : false
    const imageW = imageWidth !== undefined ? String(imageWidth) : "150";

    const dest = headers['sec-fetch-dest'] || headers['Sec-Fetch-Dest'];
    const accept = headers['accept'];
    const isImage = dest ? dest === 'image' : !/text\/html/.test(accept);

    let result = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" version="1.2" height="${articles.length * h}">`;

    await asyncForEach(articles, async (article, index) => {
        const articleCard = await ArticleCard(article, hideImg, imageUrl, hideD, imageW);
        result += `<g transform="translate(0, ${index * h})">${articleCard}</g>`;
    });

    result += `</svg>`;

    if (isImage) {
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
        res.setHeader('Content-Type', 'image/svg+xml');
        return res.send(result);
    }

    res.writeHead(200, {'Content-Type': 'image/svg+xml'});
    res.end();
}

export async function generateSvg(
    index: string | string[],
    width: string | string[],
    height: string | string[],
    hideImage: string | string[],
    hideDate: string | string[],
    imageUrl: string | string[],
    imageWidth: string | string[],
    articles: any[],
    headers,
    res: NowResponse & {
        send: (body: any) => VercelResponse; json: (jsonBody: any) => VercelResponse; status: (statusCode: number) => VercelResponse; redirect: (statusOrUrl: (string | number), url?: string) => VercelResponse
    }) {

    let article
    if (index) {
        article = articles[Number(index)];
    } else {
        article = articles[0];
    }

    const w = width !== undefined ? String(width) : "700";
    const h = height !== undefined ? String(height) : "120"
    const hideD = hideDate !== undefined ? hideDate : false
    const hideImg = hideImage !== undefined ? hideImage : false
    const imageW = imageWidth !== undefined ? String(imageWidth) : "150";

    const dest = headers['sec-fetch-dest'] || headers['Sec-Fetch-Dest'];
    const accept = headers['accept'];
    const isImage = dest ? dest === 'image' : !/text\/html/.test(accept);

    let result = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" version="1.2" height="${h}">`;
    const articleCard = await ArticleCard(article, hideImg, imageUrl, hideD, imageW);
    result += `<g transform="translate(0, 0})">${articleCard}</g>`;
    result += `</svg>`;

    if (isImage) {
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
        res.setHeader('Content-Type', 'image/svg+xml');
        return res.send(result);
    }

    res.writeHead(301, {Location: article.link});
    res.end();
}

export async function convertImg(url: string) {
    const {data: thumbnailRaw} = await axios.get(url, {
        responseType: 'arraybuffer',
    });

    const base64Img = Buffer.from(thumbnailRaw).toString('base64');
    const imgTypeArr = url.split('.');
    const imgType = imgTypeArr[imgTypeArr.length - 1];
    return `data:image/${imgType};base64,${base64Img}`;
}
