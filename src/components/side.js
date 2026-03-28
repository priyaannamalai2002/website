import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { theme, media } from '@styles';
const { colors, loaderDelay } = theme;

const StyledContainer = styled.div`
  width: ${props => (props.orientation === 'left' ? '40px' : '30px')};
  position: fixed;
  bottom: 0;
  left: ${props => (props.orientation === 'left' ? '40px' : 'auto')};
  right: ${props => (props.orientation === 'left' ? 'auto' : '30px')};
  z-index: 10;
  color: ${colors.green};
  ${media.desktop`
    left: ${props => (props.orientation === 'left' ? '20px' : 'auto')};
    right: ${props => (props.orientation === 'left' ? 'auto' : '20px')};
  `};
  ${media.tablet`display: none;`};
`;

const StyledText = styled.div`
  font-size: 12px;
  letter-spacing: 0.1em;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  margin-bottom: 20px;
`;

const Side = ({ children, isHome, orientation }) => {
  const [isMounted, setIsMounted] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      return;
    }
    const timeout = setTimeout(() => setIsMounted(true), loaderDelay);
    return () => clearTimeout(timeout);
  }, [isHome]);

  return (
    <StyledContainer orientation={orientation}>
      <TransitionGroup component={null}>
        {isMounted && (
          <CSSTransition classNames={isHome ? 'fade' : ''} timeout={isHome ? loaderDelay : 0}>
            {orientation === 'left' ? children : <StyledText>{children}</StyledText>}
          </CSSTransition>
        )}
      </TransitionGroup>
    </StyledContainer>
  );
};

Side.propTypes = {
  children: PropTypes.node.isRequired,
  isHome: PropTypes.bool,
  orientation: PropTypes.string,
};

export default Side;
