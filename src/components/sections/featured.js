import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
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

  &:hover {
    transform: translateY(-7px);
  }
`;

const StyledImg = styled(Img)`
  width: 100%;
  height: 100%;
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};
  mix-blend-mode: multiply;
  filter: grayscale(100%) contrast(1) brightness(90%);

  & > div {
    height: 100% !important;
  }

  img {
    object-fit: cover !important;
    height: 100% !important;
  }
`;

const StyledImageWrapper = styled.div`
  ${mixins.boxShadow};
  position: relative;
  z-index: 1;
  background-color: ${colors.green};
  border-radius: ${theme.borderRadius};
  overflow: hidden;
  transition: ${theme.transition};
  width: 100%;
  height: 200px;
  margin-bottom: 20px;

  &:hover {
    &:before {
      background: transparent;
    }
    ${StyledImg} {
      filter: none;
    }
  }

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    transition: ${theme.transition};
    background-color: ${colors.navy};
    mix-blend-mode: screen;
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
            const { external, title, cover } = frontmatter;

            return (
              <StyledPublicationCard
                key={i}
                href={external || '#'}
                target="_blank"
                rel="nofollow noopener noreferrer"
                ref={el => (revealProjects.current[i] = el)}>
                <StyledImageWrapper>
                  <StyledImg fluid={cover.childImageSharp.fluid} alt={title} />
                </StyledImageWrapper>
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
