import React from 'react'
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";

/**
 * @author
 * @function Footer
 **/


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

          </Column>
          <Column>
          <Heading>Social Media</Heading>
            <FooterLink href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>
                  Youtube
                </span>
              </i>
            </FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="#">Lutz Westhäusser</FooterLink>
            <FooterLink href="#">Hannes Rüffer</FooterLink>
            <FooterLink href="#">Der Rest</FooterLink>
          </Column>
          <Column>
            
          </Column>
        </Row>
      </Container>
    </Box>
  )
}

export default Footer
