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
  grid-gap: 20px;
  margin-top: 50px;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    grid-gap: 15px;
    max-width: 400px;
  }

  @media (max-width: 480px) {
    grid-gap: 10px;
    max-width: 300px;
  }
`;

const StyledCertCard = styled.div`
  ${mixins.boxShadow};
  background-color: ${colors.lightNavy};
  border-radius: ${theme.borderRadius};
  padding: 20px;
  transition: ${theme.transition};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  aspect-ratio: 1 / 1;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }

  &:hover {
    transform: translateY(-5px);
    background-color: ${colors.navy};
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const StyledCertImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
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
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${colors.lightestSlate};
  text-align: center;
  line-height: 1.2;
  margin: 0;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: ${fontSizes.xs};
  }

  @media (max-width: 480px) {
    font-size: ${fontSizes.xxs};
  }
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
