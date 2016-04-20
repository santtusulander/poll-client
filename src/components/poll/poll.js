import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Colors, Button } from 'react-foundation';
import { create, createTitle } from '../../actions/poll';
import { ChoicesContainer } from './choices';

export class Poll extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorMessage) {
      console.log(nextProps.errorMessage);
    }
  }

  render() {
    const { onSubmit, setTitle, poll } = this.props;
    const handleCreatePoll = () => {
      onSubmit(poll);
    };
    const handleSetTitle = () => {
      setTitle(this.refs.title.value);
    };
    const titleField = poll.get('title')
      ? poll.get('title')
      : (<input type="text" ref="title" placeholder="Favorite programming language" required/>);
    return (
      <div className="poll">
        <div className="poll-box">
          <label>
            Title:
            {titleField}
          </label>
          <label>
            <ChoicesContainer/>
          </label>
          <Button onClick={handleSetTitle} color={Colors.PRIMARY} isExpanded>Save title</Button>
          <Button onClick={handleCreatePoll} color={Colors.PRIMARY} isExpanded>Create poll</Button>
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
    onSubmit: (poll) => {
      dispatch(create(poll));
    },
    setTitle: (title) => {
      dispatch(createTitle(title));
    }
  };
}

export const PollContainer = connect(mapStateToProps, mapDispatchToProps)(Poll);
