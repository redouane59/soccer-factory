import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import routes from './routes';

it('renders without crashing', () => {
  const div = document.createElement('div');
  //ReactDOM.render(<App />, div);
  ReactDOM.render(
  <Router routes={routes} history={history} />,
  document.getElementById('soccer-factory')
  );

});
