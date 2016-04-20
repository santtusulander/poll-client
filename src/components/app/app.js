/*eslint no-unused-vars: 0*/

import React, { Component } from 'react';
import { connect } from 'react-redux';

export const App = (props) => {
  return (
    <div className="app">
      {props.children}
    </div>
  );
};
