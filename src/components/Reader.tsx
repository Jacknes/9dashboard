import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import styled, { css } from '../styled-components';
import ReaderActions from './ReaderActions';

type Props = {
    story: {
        headline: string;
        body: string;
    };
};

const Reader = (props: Props) => {
    const { story, onClearStory } = props;

    const rootRef = React.createRef();

    if (!story) {
        return null;
    }

    useEffect(
        () => {
            setHasParsed(false);
            rootRef.current.scrollTo(0, 0);
        },
        [story.body],
    );

    const onFullScreen = e => {
        e.preventDefault();
        console.log('ofs');
        setFullScreen(!fullScreen);
    };

    const [hasParsed, setHasParsed] = useState(false);
    const [parsedBody, setParsedBody] = useState(null);
    const [fullScreen, setFullScreen] = useState(false);

    const parseBody = (body: string) => {
        setHasParsed(true);

        const domparser = new DOMParser();
        const doc = domparser.parseFromString(body, 'text/html');

        const embeds = doc.body.querySelectorAll('.embed-social');

        for (let i = 0; i < embeds.length; i++) {
            const el = embeds[i];
            const index = [...el.parentElement.children].indexOf(el);
            const newEl = doc.createElement('blockquote');
            const url = el.getAttribute('href');
            newEl.classList.add('twitter-tweet');
            newEl.innerHTML = `<a href="${url}"></a>`;
            el.parentElement.insertBefore(newEl, el);
            el.parentElement.removeChild(el);
        }
        setParsedBody(doc.body.innerHTML);

        setTimeout(() => {
            twttr.widgets.load();
        }, 100);
    };

    const { id, headline, body, author, time, section, image } = story;

    if (!hasParsed) {
        parseBody(body);
    }
    const bananas = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    return (
        <Root ref={rootRef} fullScreen={fullScreen}>
            <ReaderActions id={id} onClearStory={onClearStory} onFullScreen={onFullScreen} />
            <ReaderRoot>
                <TopInfo>
                    <Section>{section}</Section>
                    <ReadingTime>Reading Time: {bananas} bananas</ReadingTime>
                </TopInfo>
                <Headline>{headline}</Headline>
                <Details>
                    <Author>{author}</Author>
                    <Time>{format(time, 'hh:mm a')}</Time>
                </Details>
                <HeroImage src={image} />
                <Body dangerouslySetInnerHTML={{ __html: parsedBody || '' }} />
            </ReaderRoot>
        </Root>
    );
};

const rootFullscreenStyles = css`
    position: fixed;
    background: ${p => p.theme.colors.bgDefault};
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    margin: auto;
    z-index: 100;
`;

const HeroImage = styled.img`
    margin-top: 24px;
    width: 100%;
    height: auto;
`;

const Root = styled.div<{ p: any }>`
    display: block;
    overflow-y: scroll;
    flex-basis: 60%;
    flex: 1;
    ${p => p.fullScreen && rootFullscreenStyles};
`;

const Headline = styled.h1`
    font-size: ${p => p.theme.type.headingOne.fontSize}px;
    line-height: 1.2;
    letter-spacing: ${p => p.theme.type.headingOne.letterSpacing}px;
    font-weight: ${p => p.theme.type.headingOne.fontWeight};
    max-width: ${p => p.theme.dimensions.contentMaxWidth}px;
    margin: 32px auto 0;
`;

const Body = styled.span`
    font-size: 18px;
    line-height: ${p => p.theme.type.bodyBase.lineHeight}px;
    letter-spacing: ${p => p.theme.type.bodyBase.letterSpacing}px;
    font-weight: ${p => p.theme.type.bodyBase.fontWeight};

    margin-top: 16px;

    img {
        width: 100%;
        margin: 48px auto;
        max-width: 1100px;
        display: block;
    }

    p,
    h3,
    h2,
    h4 {
        max-width: ${p => p.theme.dimensions.contentMaxWidth}px;
        margin-left: auto;
        margin-right: auto;
    }

    iframe {
        margin: 32px auto 0;
        display: block;
    }
`;

const ReadingTime = styled.span`
    margin-left: auto;
`;

const Section = styled.span`
    text-transform: uppercase;
`;

const TopInfo = styled.div`
    display: flex;
`;

const Details = styled.div`
    max-width: ${p => p.theme.dimensions.contentMaxWidth}px;
    width: 100%;
    margin: 32px auto 0;
    text-align: left;
`;

const Author = styled.span`
    color: #999;
`;

const Time = styled.span`
    margin-left: 8px;
    color: #999;
`;
const ReaderRoot = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 28px 94px;
`;

export default Reader;
