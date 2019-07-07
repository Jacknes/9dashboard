import React, { useState, useEffect } from 'react';
import { Button, Spinner, TextField } from '../press-ui';
import styled from '../styled-components';
import Page from '../components/Page';
import VerticalList from '../components/VerticalList';
import StoryList from '../components/StoryList';
import Reader from '../components/Reader';
import EmptyState from '../components/EmptyState';
import { Event } from '../types';
import { get } from 'lodash';

const API_BASE = 'http://localhost:3004/api';
const IMAGE_RENDITION_URL_PREFIX = 'https://static.ffx.io';
const sections = {
    wwos:
        '/v1/wwos/items/50FAFDB1-29E0-4FB5-876B-1B1ABF298068/descendants?depthLimit=1&sortBy=displayDateTime&limit=20&sections=&tags=&hasMedia=true&templates=Article%2CGallery',
    // news:
    //     '/v1/news/items/sitecore/content/news/news/home/top-news-by-region/national?depthLimit=1&limit=20',
    news:
        '/v1/network/items/F6CA4122-CDD2-4532-9178-5E83C8727973/descendants?depthLimit=1&sortBy=displayDateTime&limit=30',
};

const brands = ['brisbanetimes', 'canberratimes', 'smh', 'theage', 'watoday'];
const BASE_IMAGE_QUALITY = 86;
const HDPI_IMAGE_QUALITY = 62;

const handleLoadData = (vertical: string) => {
    switch (vertical) {
        case '9news':
            return fetchStories(API_BASE + sections.news);
        case 'wwos':
            return fetchStories(API_BASE + sections.wwos);
    }
};

const validateWatermarkBrand = watermarkBrand => {
    if (watermarkBrand) {
        if (brands.indexOf(watermarkBrand) > -1) {
            return true;
        }
    }
    return false;
};

// get multiply factor for images which render larger than cropWidth, to avoid blurriness (min. 1)
const getMultiply = (cropWidth, width) => Math.max(Math.round((width / cropWidth) * 100) / 100, 1);

// get width for device's DPR
const getWidthForDPR = (dpr, width) => dpr * width;

// get quality for device's DPR
const getQualityForDPR = dpr => (dpr > 1 ? HDPI_IMAGE_QUALITY : BASE_IMAGE_QUALITY);

const getImgRenditionURL = ({
    aspectRatio,
    dpr = 1.0,
    format = 'auto',
    image,
    imageRenditionURLPrefix,
    width,
}) => {
    const { aspect, autoCrop, cropWidth, id, offsetX, offsetY, watermarkBrand, zoom } = image;
    const watermarkRequest = validateWatermarkBrand(watermarkBrand)
        ? `/g_south_east,w_1.0,fl_relative,l_social_overlay_${watermarkBrand}`
        : '';
    const widthForDPR = getWidthForDPR(dpr, width);

    let params;
    if (aspect === 0) {
        // uncropped images
        params = `$width_${widthForDPR}/t_resize_width`;
    } else if (autoCrop) {
        params = `$width_${widthForDPR},$height_${Math.ceil(
            widthForDPR / aspectRatio,
        )}/t_crop_auto`;
    } else if (
        typeof cropWidth === 'number' &&
        typeof offsetX === 'number' &&
        typeof offsetY === 'number' &&
        typeof zoom === 'number' &&
        aspect
    ) {
        // Crop and center image when the custom aspect ratio requested is intentionally different to what's set in CMS
        // Only works for wider aspect ratios getting forced to narrower ones (e.g. 16:9 to 1:1)
        if (aspect / aspectRatio > 1.1) {
            const newZoom = Math.round(((zoom * aspect) / aspectRatio) * 10000) / 10000;

            params = `$zoom_${newZoom},$multiply_${getMultiply(
                cropWidth,
                widthForDPR,
            )},$ratio_${aspectRatio},$width_${cropWidth},$x_${Math.ceil(
                (offsetX / zoom +
                    (cropWidth / zoom - (cropWidth / zoom / aspect) * aspectRatio) / 2) *
                    newZoom,
            )},$y_${Math.ceil(offsetY * (aspect / aspectRatio))}/t_crop_custom/w_${widthForDPR}`;
        } else {
            params = `$zoom_${zoom},$multiply_${getMultiply(
                cropWidth,
                widthForDPR,
            )},$ratio_${aspect},$width_${cropWidth},$x_${offsetX},$y_${offsetY}/t_crop_custom/w_${widthForDPR}`;
        }
    } else {
        params = `$width_${widthForDPR},$height_${Math.ceil(
            widthForDPR / aspectRatio,
        )}/t_crop_fill`;
    }

    return `${imageRenditionURLPrefix}/${params}/q_${getQualityForDPR(
        dpr,
    )},f_${format}${watermarkRequest}/${id}`.replace(/,/g, '%2C');
};

const getImageUrl = ({ aspect, autoCrop, caption, cropWidth, id, offsetX, offsetY, zoom }) => {
    console.log({ aspect, autoCrop, caption, cropWidth, id, offsetX, offsetY, zoom });
    const fields = {
        aspectRatio: aspect,
        dpr: 2,
        image: {
            aspect,
            autoCrop,
            caption,
            cropWidth,
            id,
            offsetX,
            offsetY,
            zoom,
        },
        imageRenditionURLPrefix: IMAGE_RENDITION_URL_PREFIX,
        width: 375,
    };
    return getImgRenditionURL(fields);
};

const fetchStories = url => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(result => {
                console.log(result);
                return result.json();
            })
            .then(content => {
                resolve(content);
            });
    });
};

const fetchFairfaxStoriesIds = async (vertical: string) => {
    // const result = await fetch('http://localhost:3004/ffx/graphql', {
    //     method: 'POST',
    //     body: `{"query":"query listingSearch($query: String!, $brands: [Brand!]) { listingSearch(brands: $brands, query: $query) {   connection {      listing {     asset {        id        headlines {            headline          }       }      }    }  }}","variables":{"query":"","brands":"${vertical}"},"operationName":"listingSearch"}`,
    // });
    const result = await fetch(
        `http://localhost:3004/ffx/api/content/v1/brands/${vertical.toLowerCase()}/renders/web/pages/%2f`,
    );
    const json = await result.json();
    console.log('%%%', json);
    const contentUnits = json.contentUnits;
    console.log('contentUnits', contentUnits);
    let ids = [];
    for (let i = 0; i < 5; i++) {
        const unit = contentUnits[i];
        const assets = unit.assets;
        const newIds = assets.map(asset => {
            return asset.id;
        });
        ids = ids.concat(newIds);
    }
    console.log('IDS', ids);

    return ids;
};

const getFullFairfaxData = (ids: []) => {
    return Promise.all(
        ids.map(async id => {
            const result = await fetch(`http://localhost:3004/ffx/api/content/v0/assets/${id}`, {
                method: 'GET',
            });
            return result.json();
        }),
    );
};

const transformData = (data: [], fairfax: boolean) => {
    let stories = [];
    if (!data) return [];

    if (!fairfax) {
        stories = data.map(story => {
            const image = story.feedThumbnail ? story.feedThumbnail.url : '';
            const author = story.authors ? story.authors[0].name : story.author.name;
            return {
                id: story.id,
                headline: story.headline,
                body: story.bodyCopy,
                author: author,
                time: story.displayDateTime,
                image: image,
                section: story.section.title,
            };
        });
    } else {
        stories = data.map(story => {
            console.log('story', story);
            console.log(story.featuredImages.landscape16x9.data);
            return {
                headline: story.asset.headlines.headline,
                body: story.asset.body,
                author: story.asset.byline,
                time: story.dates.firstPublished,
                section: story.categories[0],
                image: getImageUrl(story.featuredImages.landscape16x9.data),
            };
        });
    }
    console.log('transformed data', stories);
    return stories;
};

const Home: React.FC = () => {
    const [data, setData] = useState([]);
    const [story, setStory] = useState();
    const [site, setSite] = useState();
    const [collapsed, setCollapsed] = useState(false);
    const [loading, setLoading] = useState(false);

    const verticals = [
        { name: 'Financial Review', value: 'AFR' },
        { name: 'Sydney Morning Herald', value: 'SMH' },
        { name: 'The Age', value: 'THE_AGE' },
        { name: 'WA Today', value: 'WA_TODAY' },
        { name: 'Brisbane Times', value: 'BRISBANE_TIMES' },
        { name: '9News', value: '9news' },
        { name: 'WWOS', value: 'wwos' },
        { name: '9Finance', value: 'finance' },
        { name: '9Honey', value: 'honey' },
        { name: '9Entertainment', value: '9entertainment' },
    ];

    useEffect(
        () => {
            let isFairfax = ['AFR', 'SMH', 'THE_AGE', 'WA_TODAY', 'BRISBANE_TIMES'].includes(site);
            setLoading(true);
            const loadData = async () => {
                if (!isFairfax) {
                    const result = await handleLoadData(site);
                    setData(transformData(result, false));
                    setLoading(false);
                } else {
                    const ids = await fetchFairfaxStoriesIds(site);
                    const allData = await getFullFairfaxData(ids);
                    console.log('allData', allData);
                    const transformedData = transformData(allData, true);
                    console.log('this data is transformed', transformedData);
                    setData(transformedData);
                    setLoading(false);
                }
            };
            loadData();
        },
        [site],
    );

    const handleSetSite = (vertical: string) => {
        setSite(vertical);
    };

    const handleSelectStory = (story: {}) => {
        setStory(story);
    };

    const handleClearStory = () => {
        console.log('CLEAR');
        setStory(undefined);
    };

    return (
        <Page>
            <Root>
                <VerticalList
                    site={site}
                    setSite={handleSetSite}
                    verticals={verticals}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />
                <StoryList
                    site={site}
                    data={data}
                    loading={loading}
                    selectedStory={story}
                    onSelectStory={handleSelectStory}
                />
                {!story && <EmptyState collapsed={data.length !== 0} />}
                <Reader story={story} onClearStory={handleClearStory} />
            </Root>
        </Page>
    );
};

const Root = styled.div`
    display: flex;
    flex-direction: row;
    min-height: 100%;
    height: 100%;
`;

export default Home;
