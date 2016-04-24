import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from '../../actions/poll';
import Choices from './choices';

export class Poll extends Component {

  componentWillMount() {
    this.props.getPoll(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorMessage instanceof String) {
      console.log(nextProps.errorMessage);
    }
  }

  render() {
    const { poll, dispatch } = this.props;
    return (
      <div className="poll">
        <div className="poll-box">
          <label>
            Title:<br/>
            {poll.get('title')}
          </label>
          <label>
            <Choices poll={poll} dispatch={dispatch}/>
          </label>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    poll: state.poll,
    errorMessage: state.poll.get('errorMessage'),
    isLoading: state.poll.get('isLoading')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    getPoll: (id) => dispatch(get(id))
  };
}

export const PollResultsContainer = connect(mapStateToProps, mapDispatchToProps)(Poll);
