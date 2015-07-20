import React from 'react/addons';
import { Grid, Row, Col } from 'react-bootstrap';

class PasswordInput extends React.Component {
  render() {
    return (
            <Grid>
             <Row>
               <PasswordField />
               <StrengthMeter />
             </Row>
            </Grid>
           );
  }
}

const SPECIAL_CHARS_REGEX = /[^A-Za-z0-9]/;
const DIGIT_REGEX = /[0-9]/;

PasswordInput.defaultProps = {
  goodPasswordPrinciples: [
    { label: "6+ characters",
      predicate: (input) => input.length > 6 },
    { label: "with at least one digit",
      predicate: (input) => input.match(DIGIT_REGEX) !== null },
    { label: "with at least one special character",
      predicate: (input) => input.match(SPECIAL_CHARS_REGEX) !== null }
  ]
};

class PasswordField extends React.Component {
  render() {
    return (<Col md={8} />);
  }
}

class StrengthMeter extends React.Component {
  render() {
    return (<Col md={4} />);
  }
}

export default PasswordInput;
