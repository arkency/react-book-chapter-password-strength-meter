import React from 'react/addons';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import classNames from 'classnames';

class PasswordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { password: '' };
  }

  render() {
    let { goodPasswordPrinciples } = this.props;
    let { password } = this.state;

    return (
            <Grid>
             <Row>
               <PasswordField />
               <StrengthMeter password={password}
                              principles={goodPasswordPrinciples} />
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
  constructor(props) {
    super(props);

    this.satisfiesPrinciple = this.satisfiesPrinciple.bind(this);
    this.principleClasses = this.principleClasses.bind(this);
  }

  satisfiesPrinciple(principle) {
    let { password } = this.props;

    return principle.predicate(password);
  }

  principleClasses(principle) {
    let satisfied = this.satisfiesPrinciple(principle);

    return classNames({
      ["text-success"]: satisfied,
      ["text-danger"]: !satisfied
    });
  }

  render() {
    let { principles } = this.props;

    return (<Col md={4}>
              <Panel>
                <h5>A good password is:</h5>
                <ul>
                  {principles.map(principle =>
                    <li className={this.principleClasses(principle)}>
                      <small>{principle.label}</small>
                    </li>
                  )}
                </ul>
              </Panel>
            </Col>);
  }
}

export default PasswordInput;
