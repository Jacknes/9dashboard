import React from 'react';
import styled from '../styled-components';
import { format } from 'date-fns';
import PlayerImage from './PlayerImage';

const EmptyState = props => {
    const { name, collapsed } = props;
    let today = new Date();
    return (
        <Root collapsed={collapsed}>
            <Background />
            <Header>
                <DateTime>{format(new Date(), 'eeee, MMMM d')}</DateTime>
                <Weather>15&deg;C Chance of Rain</Weather>
            </Header>
            <CentreInformation>
                <Greeting>Hello, Jack.</Greeting>
                <Time>{format(today, 'h:MM a')}</Time>
                <OnThisDay>
                    On this day in 1994, Amazon.com founded in Bellevue, Washington by Jeff Bezos.
                </OnThisDay>
            </CentreInformation>
            <Player>
                <PlayerImage />
            </Player>
        </Root>
    );
};

const Root = styled.div`
    color: white;
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #000;
    padding: 24px;
    /* margin-left: -340px; */
    margin-left: ${p => (p.collapsed ? '0' : '-340px')};
    transition: all 0.3s ease-in-out;
`;

const Header = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    z-index: 1;
`;

const OnThisDay = styled.span`
    margin-bottom: 8px;
    font-size: 14px;
    text-align: center;
    /* justify-self: flex-end; */
    /* margin-top: auto; */
    max-width: 300px;
    line-height: 1.4;
    padding-top: 24px;
`;

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.75;
    background-image: url('https://images.unsplash.com/photo-1528920304568-7aa06b3dda8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const DateTime = styled.span``;

const Weather = styled.span`
    margin-left: auto;
`;

const Player = styled.div`
    position: absolute;
    bottom: 24px;
    width: 600px;
    left: 0;
    right: 0;
    margin: auto;
    animation: slideUp 300ms forwards;
    animation-delay: 1000ms;
    transform: translateY(120%);

    img {
        width: 100%;
    }

    @keyframes slideUp {
        from {
            transform: translateY(101%);
        }
        to {
            transform: translateY(0);
        }
    }
`;

const CentreInformation = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    margin: 0 auto;
    z-index: 1;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    left: 0;
`;

const Time = styled.span`
    font-size: 48pt;
    margin-bottom: 28px;
`;

const Greeting = styled.span`
    font-size: 21px;
    /* margin-top: auto; */
    padding-top: 24px;
`;

export default EmptyState;
