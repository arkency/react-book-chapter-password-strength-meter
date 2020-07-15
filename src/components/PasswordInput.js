import React, { useState } from "react";
import {
  Grid,
  Row,
  Col,
  Panel,
  ProgressBar,
  FormControl,
  FormGroup,
  ControlLabel
} from "react-bootstrap";
import classNames from "classnames";

function PasswordInput(props) {
  const [password, updatePassword] = useState('');

  const changePassword = password => updatePassword(password);

  const { goodPasswordPrinciples } = props;

  return (
    <Grid>
      <Row>
        <Col md={8}>
          <PasswordField
            password={password}
            onPasswordChange={changePassword}
            principles={goodPasswordPrinciples}
          />
        </Col>
        <Col md={4}>
          <StrengthMeter
            password={password}
            principles={goodPasswordPrinciples}
          />
        </Col>
      </Row>
    </Grid>
  );
}

const SPECIAL_CHARS_REGEX = /[^A-Za-z0-9]/;
const DIGIT_REGEX = /[0-9]/;

PasswordInput.defaultProps = {
  goodPasswordPrinciples: [
    {
      label: "6+ characters",
      predicate: password => password.length >= 6
    },
    {
      label: "with at least one digit",
      predicate: password => password.match(DIGIT_REGEX) !== null
    },
    {
      label: "with at least one special character",
      predicate: password => password.match(SPECIAL_CHARS_REGEX) !== null
    }
  ]
};

function StrengthMeter(props) {
  return (
    <Panel>
      <PrinciplesProgress {...props} />
      <h5>A good password is:</h5>
      <PrinciplesList {...props} />
    </Panel>
  );
}

function PrinciplesProgress(props) {
  const satisfiedPercent = () => {
    const { principles, password } = props;
    const satisfiedCount = principles
      .map(p => p.predicate(password))
      .reduce((count, satisfied) => count + (satisfied ? 1 : 0), 0);
    const principlesCount = principles.length;

    return satisfiedCount / principlesCount * 100.0;
  }

  const progressColor = () => {
    const percentage = satisfiedPercent();

    return classNames({
      danger: percentage < 33.4,
      success: percentage >= 66.7,
      warning: percentage >= 33.4 && percentage < 66.7
    });
  }

  return (
    <ProgressBar
      now={satisfiedPercent()}
      bsStyle={progressColor()}
    />
  );
}

function PrinciplesList(props) {
  const principleSatisfied = (principle) => {
    const { password } = props;
    return principle.predicate(password);
  }

  const principleClass = (principle) => {
    const satisfied = principleSatisfied(principle);
    return classNames({
      ["text-success"]: satisfied,
      ["text-danger"]: !satisfied
    });
  }

  const { principles } = props;

  return (
    <ul>
      {principles.map(principle =>
        <li key={principle.label} className={principleClass(principle)}>
          <small>
            {principle.label}
          </small>
        </li>
      )}
    </ul>
  );
}

function PasswordField(props) {
  const handlePasswordChange = ev => {
    let { onPasswordChange } = props;
    onPasswordChange(ev.target.value);
  }

  const satisfiedPercent = () => {
    const { principles, password } = props;

    const satisfiedCount = principles
      .map(p => p.predicate(password))
      .reduce((count, satisfied) => count + (satisfied ? 1 : 0), 0);

    const principlesCount = principles.length;

    return satisfiedCount / principlesCount * 100.0;
  }

  const inputColor = () => {
    const percentage = satisfiedPercent();

    return classNames({
      error: percentage < 33.4,
      success: percentage >= 66.7,
      warning: percentage >= 33.4 && percentage < 66.7
    });
  }

  const { password } = props;

  return (
    <FormGroup validationState={inputColor()}>
      <ControlLabel>Password</ControlLabel>
      <FormControl
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <FormControl.Feedback />
    </FormGroup>
  );
}

export default PasswordInput;
