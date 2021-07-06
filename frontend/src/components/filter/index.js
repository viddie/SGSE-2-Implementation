import React from 'react'
import { Alert, Button, Dropdown, Navbar, NavDropdown, Nav, Form, Row, Col, FormControl, Container, Image } from 'react-bootstrap'
import { propTypes } from 'react-bootstrap/esm/Image'

/**
 * @author
 * @function Filter
 **/


const Filter = (props) => {
  return (
    <Container>
      <Row>
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Kategorien
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Kategorie 1</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Kategorie 2</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Kategorie 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </Col>
          <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Sortieren nach
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Datum</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Beliebtheit</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Preis aufsteigend</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Preis absteigend</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>

  )
}

export default Filter