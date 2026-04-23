import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  position: relative;
`;

const StyledTimelineContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 50px auto 0;

  &::before {
    content: '';
    position: absolute;
    left: 30px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${colors.lightGreen};
    ${media.thone`
      left: 15px;
    `};
  }
`;

const StyledJob = styled.div`
  position: relative;
  padding-left: 100px;
  margin-bottom: 50px;
  ${media.thone`
    padding-left: 50px;
  `};

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 0;
    width: 30px;
    height: 30px;
    background: ${colors.green};
    border: 3px solid ${colors.navy};
    border-radius: 50%;
    transition: ${theme.transition};
    ${media.thone`
      left: 0;
      width: 20px;
      height: 20px;
      border-width: 2px;
    `};
  }

  &:hover::before {
    background: ${colors.lightGreen};
    box-shadow: 0 0 0 8px rgba(100, 255, 218, 0.1);
  }
`;

const StyledContent = styled.div`
  ${mixins.boxShadow};
  background-color: ${colors.lightNavy};
  padding: 30px;
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};

  &:hover {
    box-shadow: 0 10px 30px -15px ${colors.shadowNavy};
  }
`;

const StyledCompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCompanyName = styled.h5`
  font-size: ${fontSizes.lg};
  margin: 0;
  color: ${colors.lightestSlate};
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      color: ${colors.green};
    }
  }
`;

const StyledJobTitle = styled.p`
  font-size: ${fontSizes.md};
  margin: 0;
  color: ${colors.green};
  font-family: ${fonts.SFMono};
  font-weight: 500;
`;

const StyledLabel = styled.p`
  font-size: ${fontSizes.smish};
  color: ${colors.slate};
  font-family: ${fonts.SFMono};
  margin: 0 0 15px 0;
  padding-top: 5px;
`;

const StyledDescription = styled.div`
  color: ${colors.lightSlate};
  font-size: ${fontSizes.sm};
  line-height: 1.6;

  p {
    margin: 0 0 10px 0;
    &:last-child {
      margin-bottom: 0;
    }
  }
  a {
    ${mixins.inlineLink};
  }
  ul {
    ${mixins.fancyList};
    margin: 10px 0;
    font-size: ${fontSizes.sm};
  }
`;

const StyledLocationWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.slate};
  font-size: ${fontSizes.sm};
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid ${colors.navy};
`;

const Jobs = ({ data }) => {
  const jobsList = data.filter(({ node }) => node);

  const revealTitle = useRef(null);
  const revealJobs = useRef([]);
  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    revealJobs.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledContainer id="jobs">
      <Heading ref={revealTitle}>Where I&apos;ve Worked</Heading>

      <StyledTimelineContainer>
        {jobsList &&
          jobsList.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { url, title, company, range, location } = frontmatter;

            return (
              <StyledJob key={i} ref={el => (revealJobs.current[i] = el)}>
                <StyledContent>
                  <StyledCompanyInfo>
                    <StyledCompanyName>
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                          aria-label="Company Link">
                          {company}
                        </a>
                      ) : (
                        company
                      )}
                    </StyledCompanyName>
                    <StyledJobTitle>{title}</StyledJobTitle>
                  </StyledCompanyInfo>
                  <StyledLabel>{range}</StyledLabel>
                  <StyledDescription dangerouslySetInnerHTML={{ __html: html }} />
                  {location && (
                    <StyledLocationWrapper>
                      <span role="img" aria-label="location">
                        📍
                      </span>{' '}
                      {location}
                    </StyledLocationWrapper>
                  )}
                </StyledContent>
              </StyledJob>
            );
          })}
      </StyledTimelineContainer>
    </StyledContainer>
  );
};

Jobs.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Jobs;
