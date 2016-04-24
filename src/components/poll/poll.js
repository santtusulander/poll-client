import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Colors, Button } from 'react-foundation';
import { create, createTitle } from '../../actions/poll';
import Choices from './choices';

export class Poll extends Component {

  componentWillMount() {
    if (this.props.params.id) {
      this.props.getPoll(this.props.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.errorMessage === 'string') {
      console.log(nextProps.errorMessage);
    }
  }

  renderCreateButton(sanitized, onSubmit, poll) {
    return sanitized ? null
      : <Button
          onClick={() => onSubmit(poll)}
          color={Colors.PRIMARY}
          isExpanded>
          Create poll
        </Button>;
  }

  renderTitleButton(poll, setTitle) {
    return poll.get('title') ? null
       : <Button
          onClick={() => setTitle(this.refs.title.value)}
          color={Colors.PRIMARY}
          isExpanded>
          Save title
        </Button>;
  }

  renderTitleField(poll) {
    return poll.get('title')
      || <input
            type="text"
            ref="title"
            placeholder="Favorite programming language"
            required
          />;
  }

  render() {
    const { onSubmit, setTitle, poll, sanitized, dispatch } = this.props;
    return (
      <div className="poll">
        <div className="poll-box">
          <label>
            Title:<br/>
            {this.renderTitleField(poll)}
          </label>
          <label>
            <Choices poll={poll} dispatch={dispatch}/>
          </label>
          {this.renderCreateButton(sanitized, onSubmit, poll)}
          {this.renderTitleButton(poll, setTitle)}
          {poll.get('id')}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    poll: state.poll,
    sanitized: state.poll.get('sanitized'),
    errorMessage: state.poll.get('errorMessage'),
    isLoading: state.poll.get('isLoading')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    onSubmit: (poll) => {
      let toCreate = poll.filter((item, key) => key !== 'votes' && item.size !== 0);
      dispatch(create(toCreate.toJS()));
    },
    setTitle: (title) => dispatch(createTitle(title))
  };
}

export const PollContainer = connect(mapStateToProps, mapDispatchToProps)(Poll);
