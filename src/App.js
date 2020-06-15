import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';
import Start from './components/Start';
import Battle from './components/Battle';
import Matchup from './components/Matchup';
import Stats from './components/Stats';
import Upload from './components/Upload';

const StyledHeader = styled.header`
  background-color: var(--main-color);
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    text-decoration: none;
    margin: 2em;
    color: var(--white);
  }
`;

const StyledFooter = styled.footer`
  background-color: var(--main-color);
  color: var(--white);
  position: absolute;
  bottom 0;
  width: 100vw;
  height: 2.5em;
`;

function App() {

  return (
    <Router>
      <StyledHeader>
        <nav>
          <Link to="/">Start</Link>
          <Link to="/battle/">Battle</Link>
          <Link to="/stats/">Stats</Link>
          <Link to="/upload/">Upload</Link>
        </nav>
      </StyledHeader>

      <main>
        <Switch>
          <Route path="/battle/:id1/:id2/"><Battle /></Route>
          <Route exact path="/battle/"><Battle /></Route>
          <Route path="/matchup/:id1/:id2/"><Matchup /></Route>
          <Route path="/stats/"><Stats /></Route>
          <Route path="/upload/"><Upload /></Route>
          <Route exact path="/"><Start /></Route>
        </Switch>
      </main>

      <StyledFooter></StyledFooter>
    </Router>
  );
}

export default App;
