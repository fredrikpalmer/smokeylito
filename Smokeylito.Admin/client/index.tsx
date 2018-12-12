import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Hello from './components/Hello';
import './styles/index.less';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
      <Hello name="Joh" />,
    document.getElementById('root') as HTMLElement
  );