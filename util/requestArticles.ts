import axios from 'axios';
// @ts-ignore
import moment from 'moment';
import {convertImg} from "./utils";

const rssHost = "https://api.rss2json.com/v1/api.json?rss_url=https://rsshub.app/"
const host = "https://github-readme-juejin-recent-article-flywith24.vercel.app/"
export const getJuejinArticles = async (id) => {
    const rssUrl = String(rssHost.concat("juejin/posts/".concat(id)));
    const {
        data: {items},
    } = await axios.get(rssUrl);

    let articles: any[] = []

    const url = host.concat("juejin.png");
    const result = await convertImg(url);
    for (const element of items) {
        element.thumbnail = result
        articles.push(element)
    }
    return articles
};

export const getXiaozhuanlanArticles = async (id) => {
    const rssUrl = String(rssHost.concat("xiaozhuanlan/column/".concat(id)));
    const {
        data: {items},
    } = await axios.get(rssUrl);

    let articles: any[] = []

    const url = host.concat("xiaozhuanlan.png");
    const result = await convertImg(url);
    for (const element of items) {
        element.thumbnail = result
        articles.push(element)
    }
    return articles
};
