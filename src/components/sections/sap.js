import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  position: relative;
`;

const StyledDescription = styled.div`
  color: ${colors.slate};
  font-size: ${fontSizes.lg};
  margin-bottom: 50px;
  max-width: 700px;
`;

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
`;

const AccordionItem = styled.div`
  background-color: ${colors.lightNavy};
  border-radius: ${theme.borderRadius};
  ${mixins.boxShadow};
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px -15px ${colors.shadowNavy};
  }
`;

const AccordionHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 30px;
  background: none;
  border: none;
  cursor: pointer;
  transition: ${theme.transition};

  &:hover {
    background-color: ${colors.navy};
  }

  ${media.tablet`padding: 20px 25px;`};
`;

const AccordionHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
`;

const AccordionTitle = styled.h3`
  font-size: ${fontSizes.xxl};
  font-weight: 600;
  color: ${colors.lightestSlate};
  text-align: left;
  margin: 0;

  ${media.tablet`font-size: ${fontSizes.xl};`};
`;

const AccordionToggle = styled.div`
  font-size: 24px;
  color: ${colors.green};
  transition: transform 0.3s ease;
  transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const AccordionContent = styled.div`
  max-height: ${props => (props.isOpen ? '1000px' : '0')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: ${props => (props.isOpen ? '0 30px 30px' : '0 30px')};

  ${media.tablet`padding: ${props => (props.isOpen ? '0 25px 25px' : '0 25px')};`};
`;

const AccordionInner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  ${media.tablet`
    grid-template-columns: 1fr;
    gap: 20px;
  `};
`;

const AccordionImage = styled.div`
  width: 100%;
  height: 250px;
  background: ${colors.navy};
  border-radius: ${theme.borderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  ${media.tablet`height: 200px;`};

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: ${theme.borderRadius};
  }
`;

const AccordionDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AccordionSubtitle = styled.h4`
  font-size: ${fontSizes.lg};
  color: ${colors.green};
  font-family: ${fonts.SFMono};
  margin: 0 0 10px;
`;

const AccordionText = styled.p`
  color: ${colors.slate};
  font-size: ${fontSizes.md};
  line-height: 1.6;
  margin: 0 0 15px;
`;

const AccordionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AccordionListItem = styled.li`
  color: ${colors.slate};
  font-size: ${fontSizes.sm};
  padding-left: 20px;
  position: relative;
  margin-bottom: 8px;

  &:before {
    content: '▹';
    position: absolute;
    left: 0;
    color: ${colors.green};
    font-size: ${fontSizes.md};
    line-height: 1.2;
  }
`;

const SAPSection = ({ data }) => {
  const { frontmatter, html } = data[0].node;
  const { title } = frontmatter;
  const revealContainer = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  const events = [
    {
      title: 'AIgnite Hackathon',
      subtitle: 'SAP Internal Innovation Challenge',
      description:
        "Participated in SAP's premier AI hackathon focused on building innovative generative AI solutions for enterprise challenges.",
      achievements: [
        'Built an AI-powered solution using LLMs and RAG',
        'Collaborated with cross-functional teams',
        'Presented to SAP leadership and technical experts',
      ],
      image: '/sap/AIgnite.png',
    },
    {
      title: 'Invent',
      subtitle: 'SAP Innovation Program',
      description:
        "Contributed to SAP's Invent program, working on cutting-edge AI research and development projects that push the boundaries of enterprise technology.",
      achievements: [
        'Developed novel AI architectures for enterprise use cases',
        'Implemented scalable solutions using SAP BTP',
        'Collaborated with researchers and engineers globally',
      ],
      image: '/sap/invent.png',
    },
    {
      title: 'Google Connect with AI',
      subtitle: 'Industry Collaboration Event',
      description:
        "Attended Google's AI Connect event, exploring the latest advancements in machine learning, cloud AI services, and enterprise AI applications.",
      achievements: [
        'Learned about Google Cloud AI Platform',
        'Networked with AI practitioners and researchers',
        'Explored integrations between Google AI and SAP technologies',
      ],
      image: '/sap/google_hack.png',
    },
    {
      title: 'DCOM',
      subtitle: 'Digital Communities at SAP',
      description:
        "Active member of SAP's Digital Communities, contributing to knowledge sharing, technical discussions, and collaborative problem-solving across the organization.",
      achievements: [
        'Shared insights on AI/ML best practices',
        'Mentored junior developers and interns',
        'Contributed to technical documentation and guides',
      ],
      image: '/sap/dcom.png',
    },
  ];

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const toggleAccordion = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <StyledContainer id="sap" ref={revealContainer}>
      <Heading>{title}</Heading>
      <StyledDescription dangerouslySetInnerHTML={{ __html: html }} />

      <AccordionContainer>
        {events.map((event, index) => (
          <AccordionItem key={index}>
            <AccordionHeader onClick={() => toggleAccordion(index)}>
              <AccordionHeaderLeft>
                <AccordionTitle>{event.title}</AccordionTitle>
              </AccordionHeaderLeft>
              <AccordionToggle isOpen={openIndex === index}>▼</AccordionToggle>
            </AccordionHeader>

            <AccordionContent isOpen={openIndex === index}>
              <AccordionInner>
                <AccordionImage>
                  <img src={event.image} alt={event.title} />
                </AccordionImage>
                <AccordionDetails>
                  <AccordionSubtitle>{event.subtitle}</AccordionSubtitle>
                  <AccordionText>{event.description}</AccordionText>
                  <AccordionList>
                    {event.achievements.map((achievement, i) => (
                      <AccordionListItem key={i}>{achievement}</AccordionListItem>
                    ))}
                  </AccordionList>
                </AccordionDetails>
              </AccordionInner>
            </AccordionContent>
          </AccordionItem>
        ))}
      </AccordionContainer>
    </StyledContainer>
  );
};

SAPSection.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SAPSection;
