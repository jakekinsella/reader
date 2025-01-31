import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import { Icon } from 'central';

import FeedItem from './FeedItem';

import { Item } from '../../models/item';
import { Feed } from '../../models/feed';
import { Board } from '../../models/board';
import Boards from '../../api/boards';
import UserFeeds from '../../api/user-feeds';
import { Colors } from '../../constants';

const Toolbar = styled.div`
  position: fixed;
  display: flex;
  align-items: center;

  background-color: ${Colors.Container.background};

  width: 100%;
  height: 50px;

  padding-left: 10px;
  padding-right: 10px;

  border-bottom: 1px solid ${Colors.Container.border};

  box-shadow: 0px 0px 1px ${Colors.Container.shadow};

  justify-content: space-between
`;

const More = styled.div`
  padding-top: 5px;
  padding-right: 290px;
`;

const DeleteButton = styled.div`
  cursor: pointer;
  color: ${Colors.Text.base};

  &:hover {
    color: ${Colors.Base.red};
  }
`;

const Title = styled.div`
  font-size: 20px;
  color: ${Colors.Text.base};
`;

const Spacer = styled.div`
  height: 50px;
`

const MoreSpace = styled.div`
  height: 100vh;
`

interface Props {
  feedId: string | undefined;
  boardId: string | undefined;
  title: string;
  items: Item[];
  feeds: Feed[];
  boards: Board[];
  refresh: () => void;
}

function View({ feedId, boardId, title, items, feeds, boards, refresh }: Props) {
  const navigate = useNavigate();

  let showMore = feedId !== undefined || boardId !== undefined;

  const onDeleteItemClick = () => {
    const reset = () => {
      navigate('/');
    }

    if (feedId !== undefined) {
      UserFeeds.remove(feedId)
        .then(() => reset())
        .catch(() => reset());
    } else if (boardId !== undefined) {
      Boards.remove(boardId)
        .then(() => reset())
        .catch(() => reset());
    }
  }

  return (
    <div>
      <Toolbar>
        <Title>{title}</Title>

        <More style={{ visibility: showMore ? "visible" : "hidden" }}>
          <DeleteButton onClick={() => onDeleteItemClick()}><Icon icon="delete" size="1.25em" /></DeleteButton>
        </More>
      </Toolbar>
      <Spacer />

      {items.map((item) => {
        return (
          <div key={item.id}>
            <FeedItem boardId={boardId} item={item} feeds={feeds} boards={boards} refresh={refresh} />
          </div>
        );
      })}
      <MoreSpace />
    </div>
  );
}

export default View;
