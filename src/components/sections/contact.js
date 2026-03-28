import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig, email } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section } from '@styles';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 60vh;
  justify-content: center;
  padding: 100px 0;
  margin: 0 auto;
  max-width: 1000px;

  ${media.tablet`
    padding: 80px 0;
  `};

  ${media.phablet`
    padding: 60px 0;
  `};
`;

const StyledContent = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  ${media.tablet`
    padding: 0 25px;
  `};
`;

const StyledHeading = styled.h2`
  color: ${colors.green};
  font-size: ${fontSizes.md};
  font-family: ${fonts.SFMono};
  font-weight: normal;
  margin: 0 0 20px;
  text-align: center;

  ${media.desktop`font-size: ${fontSizes.sm};`};
  ${media.tablet`font-size: ${fontSizes.smish};`};
`;

const StyledTitle = styled.h4`
  margin: 0 0 20px;
  font-size: 60px;
  color: ${colors.lightestSlate};
  font-weight: 700;
  text-align: center;
  line-height: 1.1;

  ${media.desktop`font-size: 50px;`};
  ${media.tablet`font-size: 40px;`};
  ${media.thone`font-size: 35px;`};
`;

const StyledDescription = styled.div`
  color: ${colors.slate};
  font-size: ${fontSizes.xl};
  line-height: 1.6;
  text-align: center;
  margin: 0 0 50px;
  max-width: 500px;

  ${media.tablet`
    font-size: ${fontSizes.lg};
    margin-bottom: 40px;
  `};

  ${media.thone`
    font-size: ${fontSizes.md};
    margin-bottom: 35px;
  `};

  p {
    margin: 0;
    text-align: center;
  }

  a {
    ${mixins.inlineLink};
  }
`;

const StyledEmailLink = styled.a`
  ${mixins.bigButton};
  font-size: ${fontSizes.xl};
  padding: 1.25rem 2rem;
  margin-top: 50px;
  text-align: center;

  ${media.tablet`
    font-size: ${fontSizes.lg};
    padding: 1rem 1.75rem;
    margin-top: 40px;
  `};

  ${media.thone`
    font-size: ${fontSizes.md};
    padding: 0.9rem 1.5rem;
    margin-top: 30px;
  `};

  ${media.phablet`
    font-size: ${fontSizes.sm};
    padding: 0.8rem 1.25rem;
  `};
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

const Contact = ({ data }) => {
  if (!data || !data[0]) {
    return null;
  }

  const { frontmatter, html } = data[0].node;
  const { title, buttonText } = frontmatter;
  const revealContainer = useRef(null);

  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  return (
    <StyledContainer id="contact" ref={revealContainer}>
      <StyledContentWrapper>
        <StyledContent>
          <StyledHeading>What&apos;s Next?</StyledHeading>
          <StyledTitle>{title}</StyledTitle>
          <StyledDescription dangerouslySetInnerHTML={{ __html: html }} />
          <StyledEmailLink
            href={`mailto:${email}`}
            target="_blank"
            rel="nofollow noopener noreferrer">
            {buttonText}
          </StyledEmailLink>
        </StyledContent>
      </StyledContentWrapper>
    </StyledContainer>
  );
};

Contact.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Contact;
