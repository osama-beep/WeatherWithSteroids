import PropTypes from "prop-types";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Image,
  Container,
} from "react-bootstrap";
import { BsSearch, BsMoon, BsSun } from "react-icons/bs";
import "./Navbar.css";

function NavbarComponent({
  citta,
  setCitta,
  gestisciInvio,
  isDarkTheme,
  toggleTheme,
}) {
  return (
    <Navbar
      bg={isDarkTheme ? "dark" : "light"}
      variant={isDarkTheme ? "dark" : "light"}
      expand="lg"
    >
      <Container fluid>
        <Navbar.Brand href="#" className="navbar-brand-custom">
          MeteoEpico
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto mb-2 mb-lg-0"></Nav>
          <Form className="d-flex" onSubmit={gestisciInvio}>
            <FormControl
              type="search"
              placeholder="es: Roma, IT"
              className="me-2"
              aria-label="Search"
              value={citta}
              onChange={(e) => setCitta(e.target.value)}
            />
            <Button
              variant="link"
              type="submit"
              className="text-decoration-none"
            >
              <BsSearch />
            </Button>
          </Form>
          <Button
            variant="link"
            onClick={toggleTheme}
            className="ms-2 text-decoration-none"
          >
            {isDarkTheme ? <BsSun /> : <BsMoon />}
          </Button>
          <Image
            src="https://media.istockphoto.com/id/1495088043/it/vettoriale/icona-del-profilo-utente-avatar-o-icona-della-persona-immagine-del-profilo-simbolo-del.jpg?s=612x612&w=0&k=20&c=37n7zwsMgmgmXJz4XlwsDpLiOFMB3w-qFlpDCqJ5-BU="
            roundedCircle
            width="40"
            height="40"
            className="ms-2"
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NavbarComponent.propTypes = {
  citta: PropTypes.string.isRequired,
  setCitta: PropTypes.func.isRequired,
  gestisciInvio: PropTypes.func.isRequired,
  isDarkTheme: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};
export default NavbarComponent;
