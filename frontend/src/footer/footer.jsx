import React from 'react'
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";


const Footer = (props) => {
  return (
    <Box>
      <h1 style={{ color: "#198754", 
                   textAlign: "center", 
                   marginTop: "-50px" }}>
        Barter Smarter - besser als eBay
      </h1>
      <Container>
        <Row>
          <Column>
          <Heading>Impressum</Heading>
            <FooterLink href="#">Barter Smarter</FooterLink>
            <FooterLink href="#">BarterSmarter@web.de</FooterLink>
            <FooterLink href="#">FH Bielefeld, Campus Minden</FooterLink>
            </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="#">Lutz Westhäusser</FooterLink>
            <FooterLink href="#">Hannes Rüffer</FooterLink>
            <FooterLink href="#">Der Rest</FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  )
}

export default Footer;