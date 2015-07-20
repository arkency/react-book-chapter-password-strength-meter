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
