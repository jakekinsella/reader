import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import Sidebar from './Sidebar';
import View from './View';
import AddFeed from './AddFeed';
import AddBoard from './AddBoard';

import { Feed } from '../../models/feed';
import { Item } from '../../models/item';
import { Board } from '../../models/board';
import Boards from '../../api/boards';
import UserFeeds from '../../api/user-feeds';
import Feeds from '../../api/feeds';
import { Colors } from '../../constants';

const Root = styled.div`
  display: flex;

  width: 100%;
  height: 100%;
`;

const SidebarPane = styled.div`
  min-width: 250px;
  z-index: 10;
`;

const SidebarPaneInner = styled.div`
  min-width: 250px;
  max-width: 250px;
  min-height: 100%;
  max-height: 100%;
  position: fixed;
  overflow-x: hidden;
  overflow-y: scroll;
  border-right: 1px solid ${Colors.Container.border};

  background-color: transparent;
  box-shadow: 0px 0px 1px ${Colors.Container.shadow};
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

interface Props {
  recently_read?: boolean;
}

type State = { feedId: string | undefined, boardId: string | undefined } | undefined;

function Reader({ recently_read = false } : Props) {
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
  const [showAddBoard, setShowAddBoard] = useState<Boolean>(false);

  const hide = () => {
    setShowAddFeed(false);
    setShowAddBoard(false);
  }

  useEffect(() => {
    const listener = ({ key }: any) => {
      if (key === "Escape") {
        hide();
      }
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener)
  }, []);

  useEffect(() => {
    const listener = () => {
      hide();
    };

    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener)
  }, []);

  useEffect(() => {
    if (JSON.stringify(current) !== JSON.stringify(last)) { // structural equality
      setLast(current);
      
      window.scrollTo(0, 0);

      Boards.all().then((lists) => setBoards(lists));
      UserFeeds.all().then((feeds) => setFeeds(feeds));

      if (boardId !== undefined) {
        Boards.get(boardId).then((board) => setTitle(board.name));
        Boards.items(boardId).then((items) => setItems(items));
      } else if (feedId !== undefined) {
        Feeds.get(feedId).then((feed) => setTitle(feed.title));
        Feeds.items(feedId).then((items) => setItems(items));
      } else if (recently_read) {
        setTitle("Recently Read");
        UserFeeds.recently_read_items().then((items) => setItems(items));
      } else {
        setTitle("All Feeds");
        UserFeeds.items().then((items) => setItems(items));
      }
    }
  }, [last])

  return (
    <Root>
      <SidebarPane>
        <SidebarPaneInner>
          <Sidebar
            boards={boards}
            feeds={feeds}
            onAddFeedClick={() => setShowAddFeed(true) }
            onAddBoardClick={() => setShowAddBoard(true) }
          />
        </SidebarPaneInner>
      </SidebarPane>

      <MainPane>
        <View
          feedId={feedId}
          boardId={boardId}
          title={title}
          items={items}
          feeds={feeds}
          boards={boards}
          refresh={() => setLast(undefined)}
        />
      </MainPane>

      <FloatingPrompt style={{ visibility: showAddFeed ? "visible" : "hidden" }}>
        <div onClick={(event) => event.stopPropagation() }>
          <AddFeed onSubmit={() => { hide(); setLast(undefined) } } show={showAddFeed} />
        </div>
      </FloatingPrompt>

      <FloatingPrompt style={{ visibility: showAddBoard ? "visible" : "hidden" }}>
        <div onClick={(event) => event.stopPropagation() }>
          <AddBoard onSubmit={() => { hide(); setLast(undefined) } } show={showAddBoard} />
        </div>
      </FloatingPrompt>
    </Root>
  );
}

export default Reader;
