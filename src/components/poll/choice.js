import React, { PropTypes } from 'react';

export const Choice = props => {
  const { data, onClick, showVotes, sanitized, children } = props;
  if (sanitized && !showVotes) {
    return (
      <div onClick={ () => onClick(data.id, data.poll) }>
        { children[0] }
      </div>
    );
  }
  if (!sanitized){
    return (
      <div>
        { children }
      </div>
    );
  }
  let voteCount = children[1].count;
  return (
    <div>
      { `${children[0]}. Votes: ${voteCount}.` }
    </div>
  );
};

Choice.propTypes = {
  onClick: PropTypes.func,
  showVotes: PropTypes.bool,
  sanitized: PropTypes.bool,
  data: PropTypes.object
};
