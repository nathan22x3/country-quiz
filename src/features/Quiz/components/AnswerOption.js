import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import tw, { theme } from 'twin.macro';

const states = {
  default: theme`colors.transparent`,
  correct: theme`colors.green`,
  incorrect: theme`colors.red`,
};

const Container = styled.button`
  ${tw`flex justify-between items-center px-5 py-4 border-2 border-indigo rounded-xl text-lg font-medium text-indigo duration-200`};
  border-color: ${({ state }) => state !== 'default' && states[state]};
  background-color: ${({ state }) => state !== 'default' && states[state]};
  ${({ state }) => state !== 'default' && tw`text-white`}

  &:hover {
    border-color: ${({ state }) => state === 'default' && tw`border-orange`};
    background-color: ${({ state }) => state === 'default' && tw`bg-orange`};
    color: ${({ state }) => state === 'default' && tw`text-white`};
  }

  &::disabled:hover {
    border-color: ${({ state }) => state !== 'default' && states[state]};
    background-color: ${({ state }) => state !== 'default' && states[state]};
  }
`;

const Text = styled.span`
  counter-increment: answer;
  text-align: left;

  &::before {
    content: counter(answer, upper-latin);
    margin-right: 20px;
  }
`;

const AnswerOption = ({ text, state, disabled, onClick }) => {
  const [icon, setIcon] = useState('');

  useEffect(() => {
    try {
      setIcon(require(`assets/images/${state}.svg`).default);
    } catch (error) {}
  }, [state]);

  return (
    <Container {...{ state, disabled, onClick }}>
      <Text>{text}</Text>
      {icon && <img src={icon} alt={state} />}
    </Container>
  );
};

AnswerOption.propTypes = {
  text: PropTypes.string,
  state: PropTypes.oneOf(['default', 'correct', 'incorrect']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

AnswerOption.defaultProps = {
  text: 'Answer',
  state: 'default',
  disabled: false,
  onClick: () => {},
};

export default AnswerOption;
