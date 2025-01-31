import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';

import { Redirect } from 'central';

import Reader from './components/reader/Reader';

import { Colors, login } from './constants';

const Root = styled.div`
  position: relative;
  display: flex;

  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;

  color: ${Colors.Text.base};
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
`;

function App() {
  return (
    <Root>
      <Router>
        <Routes>
          <Route path="/" element={<Reader />} />
          <Route path="/recently_read" element={<Reader recently_read={true} />} />
          <Route path="/feeds/:feedId" element={<Reader />} />
          <Route path="/boards/:boardId" element={<Reader />} />
          <Route path="/login" element={<Redirect to={login} />} />
        </Routes>
      </Router>
    </Root>
  );
}

export default App;
