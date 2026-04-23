import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { theme, media, Section, Heading } from '@styles';
const { colors, fontSizes } = theme;

const StyledContainer = styled(Section)`
  position: relative;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  width: 100%;
  margin-top: 50px;

  ${media.tablet`
    grid-template-columns: repeat(2, 1fr);
  `};

  ${media.thone`
    grid-template-columns: 1fr;
  `};
`;

const StyledPublicationCard = styled.a`
  position: relative;
  cursor: pointer;
  transition: ${theme.transition};
  display: block;
  background-color: ${colors.lightNavy};
  border-radius: ${theme.borderRadius};
  padding: 20px;

  &:hover {
    transform: translateY(-7px);
    box-shadow: 0 20px 30px -15px ${colors.shadowNavy};
  }
`;

const StyledTitle = styled.h3`
  font-size: ${fontSizes.xxl};
  font-weight: 600;
  color: ${colors.lightestSlate};
  margin-bottom: 10px;
  line-height: 1.3;
  text-align: center;
`;

const StyledDescription = styled.p`
  font-size: ${fontSizes.md};
  color: ${colors.slate};
  line-height: 1.5;
  text-align: center;
`;

const Featured = ({ data }) => {
  const featuredProjects = data.filter(({ node }) => node);

  const revealTitle = useRef(null);
  const revealProjects = useRef([]);

  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledContainer id="projects">
      <Heading ref={revealTitle}>Publications</Heading>

      <StyledGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title } = frontmatter;

            return (
              <StyledPublicationCard
                key={i}
                href={external || '#'}
                target="_blank"
                rel="nofollow noopener noreferrer"
                ref={el => (revealProjects.current[i] = el)}>
                <StyledTitle>{title}</StyledTitle>
                <StyledDescription dangerouslySetInnerHTML={{ __html: html }} />
              </StyledPublicationCard>
            );
          })}
      </StyledGrid>
    </StyledContainer>
  );
};

Featured.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Featured;
