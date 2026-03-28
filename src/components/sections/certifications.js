import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
const { colors, fontSizes } = theme;

const StyledContainer = styled(Section)`
  position: relative;
  padding: 100px 0;
  ${media.tablet`padding: 80px 0;`};
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
  margin-top: 50px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  ${media.desktop`
    max-width: 700px;
  `};

  ${media.tablet`
    grid-gap: 25px;
    max-width: 600px;
  `};

  ${media.phablet`
    grid-gap: 20px;
    max-width: 400px;
  `};

  @media (max-width: 480px) {
    max-width: 300px;
  }
`;

const StyledCertCard = styled.div`
  ${mixins.boxShadow};
  background-color: ${colors.lightNavy};
  border-radius: ${theme.borderRadius};
  padding: 25px;
  transition: ${theme.transition};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  min-height: 250px;
  cursor: pointer;

  ${media.tablet`
    padding: 20px;
    min-height: 230px;
  `};

  ${media.thone`
    padding: 15px;
    min-height: 210px;
  `};

  &:hover {
    transform: translateY(-5px);
    background-color: ${colors.navy};
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const StyledCertImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${media.tablet`
    width: 70px;
    height: 70px;
  `};

  ${media.thone`
    width: 60px;
    height: 60px;
  `};
`;

const StyledCertImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  transition: ${theme.transition};
`;

const StyledCertTitle = styled.h3`
  font-size: ${fontSizes.md};
  font-weight: 600;
  color: ${colors.lightestSlate};
  text-align: center;
  line-height: 1.4;
  margin: 0;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.desktop`font-size: ${fontSizes.sm};`};
  ${media.tablet`font-size: ${fontSizes.smish};`};
  ${media.thone`font-size: ${fontSizes.xs};`};
`;

const CertificationsSection = () => {
  const certifications = [
    {
      title: 'SAP Certified - SAP Generative AI Developer',
      image: '/certifications/sap_gen.png',
    },
    {
      title: 'Databases and SQL for Data Science with Python (with Honors)',
      image: '/certifications/ibm.png',
    },
    {
      title: 'Data Analysis with R Programming',
      image: '/certifications/google.png',
    },
    {
      title: 'Programming for Everybody (Getting Started with Python)',
      image: '/certifications/python.png',
    },
  ];

  const revealContainer = useRef(null);
  const revealCerts = useRef([]);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
    revealCerts.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledContainer id="certifications" ref={revealContainer}>
      <Heading>Certifications</Heading>
      <StyledGrid>
        {certifications.map((cert, i) => (
          <StyledCertCard key={i} ref={el => (revealCerts.current[i] = el)}>
            <StyledCertImageWrapper>
              <StyledCertImage src={cert.image} alt={cert.title} />
            </StyledCertImageWrapper>
            <StyledCertTitle>{cert.title}</StyledCertTitle>
          </StyledCertCard>
        ))}
      </StyledGrid>
    </StyledContainer>
  );
};

CertificationsSection.propTypes = {
  data: PropTypes.array.isRequired,
};

export default CertificationsSection;
