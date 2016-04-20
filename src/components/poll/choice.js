import React, { PropTypes } from 'react';

export const Choice = props => {
  const { data, onClick, showVotes, sanitized, ...other } = props;

  return showVotes || !sanitized
      ? (<div { ...other } />)
      : (
          <div onClick={ () => onClick(data.id, data.poll) } { ...other }/>
        );
};

Choice.propTypes = {
  onClick: PropTypes.func,
  showVotes: PropTypes.bool,
  sanitized: PropTypes.bool,
  data: PropTypes.object
};
