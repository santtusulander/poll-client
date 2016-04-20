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
    const { onVote, poll } = this.props;
    if (poll.get('id')) {
      return poll.get('choices').map((choice, index) => {
        return (
          <Choice
            data={{ id: choice.id, poll: poll.get('id') }}
            onClick={ onVote }
            key={ index }
            showVotes={ false }
            sanitized>
            { choice.title }
            { poll.get('votes').get(index) || null }
          </Choice>
        );
      });
    }
    return poll.get('choices').map((choice, index) => {
      return (
        <Choice
          key={ index }
          showVotes={ false }>
          { choice }
        </Choice>
      );
    });
  }

  handleCreate(event) {
    event.preventDefault();
    this.props.onCreateChoice(this.refs.new.value);
  }

  render() {
    return (
      <div>
        {this.renderChoices()}
        <input type="text" ref="new" />
        <Button
          color={Colors.PRIMARY}
          isExpanded
          onClick={ e => this.handleCreate(e) }
        >
          Create choice
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const poll = state.poll;
  return {
    poll: poll,
    choices: poll.get('choices'),
    votes: poll.get('votes')
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
