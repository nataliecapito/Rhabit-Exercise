// @flow
import React, { PureComponent } from 'react';
import UserOrganization from './components/users/userorganization';
import './styles/App.css';

type Props = {};

export default class App extends PureComponent {
  props: Props;

  render() {
    return (
      <div id='app-top-main'>
        <UserOrganization />
      </div>
    );
  }
}
