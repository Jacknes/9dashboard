import React from 'react';
import styled from '../styled-components';
import { format } from 'date-fns';

type Props = {
    story: {} | undefined;
    selected: boolean;
    onSelectStory(story: {}): any;
};

const Story = (props: Props) => {
    const { story, selected, onSelectStory } = props;
    const { headline, author, time, image } = story;

    const handleOnClick = () => {
        onSelectStory(story);
    };
    return (
        <Root selected={selected} onClick={handleOnClick}>
            <Details>
                <Headline>{headline}</Headline>
                <Author>{author}</Author>
                <Date>{format(time, 'hh:mm a')}</Date>
            </Details>
            {image && <FeedImage src={image} />}
        </Root>
    );
};

type RootProps = { selected: boolean };
const Root = styled.div<RootProps>`
    display: flex;
    flex-direction: row;
    min-height: 150px;
    background-color: ${p => (p.selected ? p.theme.colors.grey2 : p.theme.colors.bgDefault)};
    border-bottom: 1px solid ${p => p.theme.colors.border};
    user-select: none;
    padding: 24px;
    :hover {
        cursor: pointer;
        background-color: ${p => p.theme.colors.grey1};
    }
`;

const FeedImage = styled.img`
    flex: 0 0 64px;
    width: 64px;
    height: 64px;
    object-fit: cover;
    margin-left: 16px;
`;

const Details = styled.div``;

const Headline = styled.span`
    font-weight: 600;
    line-height: 1.4;
    display: block;
    margin-bottom: 7px;
`;

const Date = styled.span`
    margin-left: 8px;
`;

const Author = styled.span``;

export default Story;
