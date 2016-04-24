import React, { Component } from 'react';
import { vote, createChoice } from '../../actions/poll';
import { Colors, Button } from 'react-foundation';
import { Choice } from './choice';

export default class Choices extends Component {

  /**
   * TODO: get votes smarter.. getting by index is fragile because it's
   * dependent on array order
   */
  renderChoices() {
    const { choices, votes, hasVoted, sanitized, id } = this.props.poll.toJS();
    if (sanitized) {
      return choices.map((choice, index) => {
        return (
          <Choice
            data={{ id: choice.id, poll: id }}
            onClick={ (pollID, choiceID) => this.props.dispatch(vote(pollID, choiceID)) }
            key={ index }
            showVotes={ hasVoted }
            sanitized>
            {`choice: ${choice.label}`}
            {votes[index]}
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
    const { dispatch } = this.props;
    let input = this.props.poll.get('sanitized') ? null
      : (
        <div>
          <input type="text" ref="new" />
          <Button
            color={Colors.PRIMARY}
            isExpanded
            onClick={ () => dispatch(createChoice(this.refs.new.value)) }>
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

