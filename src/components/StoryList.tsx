import React from 'react';
import styled from '../styled-components';
import Story from './Story';
import StoryFilter from './StoryFilter';
import Spinner from '../press-ui/Spinner';

type Props = {
    data: [] | undefined;
    collapsed: boolean;
    fairfax: boolean;
    loading: boolean;
    onSelectStory(story: {}): any;
};

const StoryList = (props: Props) => {
    const { site, data, loading, selectedStory, fairfax, onSelectStory } = props;
    console.log('storylist data', data);
    return (
        <Root collapsed={data.length === 0}>
            <StoryFilter />
            {data && !loading ? (
                data.map(story => {
                    return (
                        <Story
                            story={story}
                            selected={story === selectedStory}
                            onSelectStory={onSelectStory}
                        />
                    );
                })
            ) : (
                <SpinnerStyled color="#000" size={64} />
            )}
        </Root>
    );
};

type RootProps = {
    collapsed: boolean;
};
const Root = styled.div<RootProps>`
    display: flex;
    position: relative;
    transform: ${p => (!p.collapsed ? 'translateX(0)' : 'translateX(-101%)')};
    visibility: ${p => (!p.collapsed ? 'visible' : 'hidden')};
    transition: transform 0.3s ease-in-out;
    flex: 0;
    flex-direction: column;
    flex: 0 0 340px;
    border-right: 1px solid ${p => p.theme.colors.border};
    overflow-y: scroll;
`;

const SpinnerStyled = styled(Spinner)`
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 0;
    right: 0;
`;

export default StoryList;
