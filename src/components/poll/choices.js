import React, { Component } from 'react';
import { connect } from 'react-redux';
import { vote, createChoice } from '../../actions/poll';
import { Colors, Button } from 'react-foundation';
import { Choice } from './choice';

export class Choices extends Component {

  /**
   * TODO: get votes smarter.. getting by index is fragile because it's
   * dependent on array order
   */

  renderChoices() {
    const { onVote, choices, votes, hasVoted, sanitized, pollId } = this.props;
    if (sanitized) {
      return choices.map((choice, index) => {
        return (
          <Choice
            data={{ id: choice.id, poll: pollId }}
            onClick={ onVote }
            key={ index }
            showVotes={ hasVoted }
            sanitized>
            {`choice: ${choice.label}`}
            {votes.get(index)}
          </Choice>
        );
      });
    }
    return choices.map((choice, index) => {
      return (
        <Choice key={ index }>
          {`choice: ${choice}`}
        </Choice>
      );
    });
  }

  render() {
    const { sanitized, onCreateChoice } = this.props;
    let input = sanitized ? null
      : (
        <div>
          <input type="text" ref="new" />
          <Button
            color={Colors.PRIMARY}
            isExpanded
            onClick={ () => onCreateChoice(this.refs.new.value) }>
            Create choice
          </Button>
        </div>
      );
    return (
      <div>
        {this.renderChoices()}
        {input}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const poll = state.poll;
  return {
    hasVoted: poll.get('hasVoted'),
    pollId: poll.get('id'),
    choices: poll.get('choices'),
    votes: poll.get('votes'),
    sanitized: poll.get('sanitized')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCreateChoice: (choiceTitle) => {
      dispatch(createChoice(choiceTitle));
    },
    onVote: (choiceID, pollID) => {
      dispatch(vote(choiceID, pollID));
    }
  };
}

export const ChoicesContainer = connect(mapStateToProps, mapDispatchToProps)(Choices);
