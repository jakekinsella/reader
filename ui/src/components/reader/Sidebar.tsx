import React from 'react';
import styled from '@emotion/styled';

import { Colors } from '../../constants';
import { Board } from '../../models/board';
import { Feed } from '../../models/feed';

const Container = styled.div`
  padding-top: 14px;
  padding-bottom: 50px;
`;

const Divider = styled.hr`
  margin-left: 5px;
  margin-right: 5px;
  border: 0;
  border-top: 1px solid ${Colors.Container.border};
`;

const Spacer = styled.div`
  width: 100%;
  height: 8px;
`;

const Header = styled.div`
  padding-left: 20px;
  padding-top: 5px;
  padding-bottom: 5px;

  font-size: 18px;
`;

const ClickableHeader = styled.a`
  display: block;

  padding-left: 20px;
  padding-top: 5px;
  padding-bottom: 5px;

  text-decoration: none;
  font-size: 18px;
  color: ${Colors.Text.base};

  cursor: pointer;

  &:hover {
    text-decoration: none;
    color: ${Colors.Text.hover};
  }

  &:visited {
    text-decoration: none;
  }

  &:active {
    text-decoration: none;
  }
`;

const Item = styled.a`
  display: block;

  padding-left: 30px;

  text-decoration: none;
  font-size: 15px;
  color: ${Colors.Text.base};

  cursor: pointer;

  &:hover {
    text-decoration: none;
    color: ${Colors.Text.hover};
  }

  &:visited {
    text-decoration: none;
  }

  &:active {
    text-decoration: none;
  }
`;

interface Props {
  boards: Board[];
  feeds: Feed[];
  onAddFeedClick: () => void;
  onAddBoardClick: () => void;
}

function Sidebar({ boards, feeds, onAddFeedClick, onAddBoardClick }: Props) {
  return (
    <Container>
      <ClickableHeader href={`/`}>All</ClickableHeader>

      <Spacer />
      <Divider />
      <Spacer />

      <Header>Boards</Header>
       <Spacer />
       <div>
         {boards.map((board) => {
           return <Item key={board.id} href={`/boards/${board.id}`}>{board.name}</Item>;
         })}
         <Item href={`/recently_read/`}>Recently Read</Item>
         <br />
         <Item href='#' onClick={(event) => { event.stopPropagation(); onAddBoardClick() }}>+ Add board</Item>
       </div>

      <Spacer />
      <Spacer />
      <Divider />
      <Spacer />

      <Header>Feeds</Header>
      <Spacer />
      <div>
        {feeds.map((feed) => {
          return <Item key={feed.source} href={`/feeds/${encodeURIComponent(feed.source)}`}>{feed.title}</Item>;
        })}
        <br />
        <Item href='#' onClick={(event) => { event.stopPropagation(); onAddFeedClick() }}>+ Add feed</Item>
      </div>
    </Container>
  );
}

export default Sidebar;
