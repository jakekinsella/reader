import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import Sidebar from './Sidebar';
import View from './View';
import AddFeed from './AddFeed';

import { Feed } from '../../models/feed';
import { Item } from '../../models/item';
import { Board } from '../../models/board';
import Boards from '../../api/boards';
import UserFeeds from '../../api/user-feeds';
import Feeds from '../../api/feeds';
import { colors } from '../../constants';

const Root = styled.div`
  display: flex;

  width: 100%;
  height: 100%;
`;

const SidebarPane = styled.div`
  min-width: 250px;
  z-index: 10;

  background-color: white;
  border-right: 1px solid ${colors.black};
`;

const MainPane = styled.div`
  width: 100%;
`;

const FloatingPrompt = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;

  z-index: 11;
`;

type State = { feedId: string | undefined, boardId: string | undefined } | undefined;

function Reader() {
  const params = useParams();
  const feedId = params.feedId;
  const boardId = params.boardId;

  const current : State = { feedId: feedId, boardId: boardId };
  const [last, setLast] = useState<State>(undefined);

  const [boards, setBoards] = useState<Board[]>([]);
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState<string>("");

  const [showAddFeed, setShowAddFeed] = useState<Boolean>(false);

  useEffect(() => {
    const listener = ({ key }: any) => {
      if (key === "Escape") {
        setShowAddFeed(false);
      }
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener)
  }, []);

  if (JSON.stringify(current) !== JSON.stringify(last)) { // structural equality
    setLast(current);
    
    Boards.all().then((lists) => setBoards(lists));
    UserFeeds.all().then((feeds) => setFeeds(feeds));

    if (boardId !== undefined) {
      Boards.get(boardId).then((board) => setTitle(board.name));
      Boards.items(boardId).then((items) => setItems(items));
    } else if (feedId !== undefined) {
      Feeds.get(feedId).then((feed) => setTitle(feed.title));
      Feeds.items(feedId).then((items) => setItems(items));
    } else {
      setTitle("All Feeds");
      UserFeeds.items().then((items) => setItems(items));
    }
  }

  return (
    <Root>
      <SidebarPane>
        <Sidebar boards={boards} feeds={feeds} onAddFeedClick={() => setShowAddFeed(true) } />
      </SidebarPane>

      <MainPane>
        <View title={title} items={items} />
      </MainPane>

      <FloatingPrompt style={{ visibility: showAddFeed ? "visible" : "hidden" }}>
        <AddFeed onSubmit={() => setShowAddFeed(false) } />
      </FloatingPrompt>
    </Root>
  );
}

export default Reader;
