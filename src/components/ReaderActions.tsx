import React from 'react';
import styled from '../styled-components';
import Icon from '../press-ui/Icon';

const ReaderActions = props => {
    const { id, onClearStory, onFullScreen } = props;
    const handleClickClose = () => {
        onClearStory();
    };
    const handleOpenPress = () => {
        console.log('test');
        window.open(`https://press.nine.com.au/item/${id}`, '_blank');
    };
    return (
        <Root>
            <Action type="search" />
            <Action type="link" />
            <Action type="trending" />
            <ActionWrapper onClick={handleOpenPress}>
                <Action type="openNew" />
            </ActionWrapper>
            <Action type="settings" />
            <ActionWrapper onClick={onFullScreen}>
                <Action type="fullScreen" />
            </ActionWrapper>
            <ActionWrapper onClick={handleClickClose}>
                <Action type="close" />
            </ActionWrapper>
        </Root>
    );
};

const Root = styled.div`
    display: flex;
    flex: 0 0 64px;
    border-bottom: 1px solid ${p => p.theme.colors.border};
    height: 64px;
    justify-content: flex-end;
    align-items: center;
    padding: 0 24px;
    position: sticky;
    top: 0;
    background: ${p => p.theme.colors.bgDefault};
`;

const ActionWrapper = styled.div``;

const Action = styled(Icon)`
    margin-left: 16px;
    cursor: pointer;
`;

export default ReaderActions;
