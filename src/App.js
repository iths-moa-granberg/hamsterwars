import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Start from './components/Start/Start';
import Battle from './components/Battle/Battle';
import Matchup from './components/Matchup/Matchup';
import Stats from './components/Stats/Stats';
import Upload from './components/Upload/Upload';
import Header from './components/Header/Header';
import Hamster from './components/Hamster/Hamster';

const StyledFooter = styled.footer`
  background-color: var(--primary-color);
  color: var(--white);
  position: absolute;
  bottom 0;
  right: 0;
  width: 100vw;
  height: 4em;
`;

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path="/battle/:id1/:id2/">
            <Battle />
          </Route>
          <Route exact path="/battle/">
            <Battle />
          </Route>
          <Route path="/matchup/:id1/:id2/">
            <Matchup />
          </Route>
          <Route path="/stats/">
            <Stats />
          </Route>
          <Route path="/upload/">
            <Upload />
          </Route>
          <Route path="/hamster/:id">
            <Hamster />
          </Route>
          <Route exact path="/">
            <Start />
          </Route>
        </Switch>
      </main>

      <StyledFooter></StyledFooter>
    </Router>
  );
}

export default App;
