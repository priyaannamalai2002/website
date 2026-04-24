import React, { useEffect, useRef } from 'react';
import { withPrefix } from 'gatsby';
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
  grid-gap: 25px;
  margin-top: 50px;
  width: 100%;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    grid-gap: 20px;
    max-width: 600px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-gap: 15px;
    max-width: 100%;
  }
`;

const StyledCertCard = styled.div`
  ${mixins.boxShadow};
  background-color: ${colors.lightNavy};
  border-radius: ${theme.borderRadius};
  padding: 30px 25px;
  transition: ${theme.transition};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 25px 20px;
  }

  @media (max-width: 480px) {
    padding: 20px 15px;
  }

  &:hover {
    transform: translateY(-7px);
    box-shadow: 0 20px 30px -15px ${colors.shadowNavy};
    background-color: ${colors.navy};
  }

  &:hover img {
    filter: none;
    transform: scale(1.03);
  }
`;

const StyledCertImageWrapper = styled.div`
  width: 200px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: ${colors.navy};
  border-radius: ${theme.borderRadius};
  overflow: hidden;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 160px;
    height: 220px;
  }

  @media (max-width: 480px) {
    width: 140px;
    height: 200px;
  }
`;

const StyledCertImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 15px;
  filter: grayscale(20%) contrast(1) brightness(95%);
  transition: ${theme.transition};
`;

const StyledCertTitle = styled.h3`
  font-size: ${fontSizes.md};
  font-weight: 600;
  color: ${colors.lightestSlate};
  text-align: center;
  line-height: 1.3;
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${fontSizes.sm};
  }

  @media (max-width: 480px) {
    font-size: ${fontSizes.xs};
  }
`;

const CertificationsSection = () => {
  const certifications = [
    {
      title: 'SAP Certified - SAP Generative AI Developer',
      image: withPrefix('/certifications/sap_gen.png'),
    },
    {
      title: 'Databases and SQL for Data Science with Python (with Honors)',
      image: withPrefix('/certifications/ibm.png'),
    },
    {
      title: 'Data Analysis with R Programming',
      image: withPrefix('/certifications/google.png'),
    },
    {
      title: 'Programming for Everybody (Getting Started with Python)',
      image: withPrefix('/certifications/python.png'),
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

export default CertificationsSection;
