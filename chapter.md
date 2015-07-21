# Password Strength Meter

![Password Strength Meter](images/password-strength-meter.png)

Registration form is like the first step that user needs to take to use your web application. It's interesting how often it is not optimal part of the app. Having an unfriendly registration form may hurt (and usually hurts) the conversion rate of your service badly.

That's why dynamic features are often starting with forms. On-the-fly validations, popovers and so on - all of these are common in the modern web. All to increase chance of signing up by an user.

Apart from the sole signing up, a good registration form needs to make sure that an user does not do anything wrong - like setting too simple password. Password strength meters are a great way to show an user how his password should be constructed to be secure.

## Requirements

This example will use [React-Bootstrap](http://react-bootstrap.github.io) components. **Remember that React-Bootstrap must be installed separately - visit the main page of the project for installation details**. Using React Bootstrap simplifies the example because common UI elements like progress bars don't need to be created from scratch.

Apart from this, a tiny utility called [classnames](https://www.npmjs.com/package/classnames) will be used. It allows you to express CSS class set with conditionals in an easy way.

Of course the last element is the React library itself.

## Recipe

In this example you don't need to make any assumptions about how the password strength meter will work. There is the static HTML mockup ready to reference how the strength meter will look and behave, based on the password input. It is written using the Bootstrap CSS framework, so elements presented will align well with components that React-Bootstrap provides.

![Password Strength Meter States](images/password-strength-meter-mockup.png)

{lang="html"}
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="form-group has-success has-feedback">
            <label class="control-label"
                   for="password-input">Password</label>
            <input type="password" 
                   class="form-control" 
                   id="password-input"
                   value="FW&$2iVaFt3va6bGu4Bd"
                   placeholder="Password" />
            <span class="glyphicon glyphicon-ok form-control-feedback" 
                  aria-hidden="true"></span>
          </div>
        </div>
        <div class="col-md-4">
          <div class="panel panel-default">
            <div class="panel-body">
              <div class="progress">
                <div class="progress-bar progress-bar-success" 
                     style="width:100%"></div>
              </div>
              <h5>A good password is:</h5>
              <ul>
                <li class="text-success">
                  <small>
                    6&plus; characters
                  </small>
                </li>
                <li class="text-success">
                  <small>
                    with at least one digit
                  </small>
                </li>
                <li class="text-success">
                  <small>
                    with at least one special character
                  </small>
                </li>
              </ul>          
            </div>
          </div>
        </div>
        <!-- Rest of states... -->
      </div>
    </div>  

This piece of HTML defines the whole structure that will be duplicated. All "creative" work that needs to be done here is to attach the dynamic behaviour and state transitions.

There are some _principles_ that states how a good password should look like.
You can think that a password _satisfies_ or not those principles. That will be important later - your behaviour will be built around this concept. 

As you can see, there are three states of the strength meter UI:

* Awful password - progress bar is red and an input is in "red" state (1/3 or less principles satisfied)
* Mediocre password - progress bar is  yellow and an input is in "yellow" state (1/3 to 2/3 principles satisfied)
* Great password - progress bar is green and an input is in "green" state (2/3 or more principles satisfied)

Since you got a HTML mockup, after each step you can compare output produced by React with HTML markup of the static example. Another approach (see `Prefixer` example if you want to see this approach in action) is to _copy_ this HTML and then attach the dynamic behaviour to it. In this example the code will start from the top. First an empty component will be created and then the _logical_ parts of this UI will be defined. After those steps there will be iterations to finish with the markup desired.

Enough said, let's start with an empty component:

{lang="javascript"}
    class PasswordInput extends React.Component {
      render() { return null; }
    }

Let's think about what logical parts this part of UI has. On the highest level it has a _strength meter_ and a _password field_. A _strength meter_ consist of _principles progress_ and _principles list_.

![Annotated Password Strength Meter](images/password-strength-meter-annotated.png)

This concepts will map directly to React components that you'll create. A static markup is also placed inside the grid. You can use `Grid`, `Row` and `Col` to create a HTML markup like this:

{lang="html"}
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          ...
        </div>
        <div class="col-md-4">
          ...
        </div>
      </div>
    </div>

Which maps directly into:

{lang="html"}
    <Grid>
      <Row>
        <Col md={8}>
          ...
        </Col>
        <Col md={4}>
          ...
        </Col>
      </Row>
    </Grid>

Remember to `import` needed React-Bootstrap components at the top of the file:

{lang="javascript"}
    import { Grid, Row, Col } from 'react-bootstrap';

Let's mimic the top structure (the grid) of your markup and define components based on the logical division!

{lang="javascript"}
  class PasswordInput extends React.Component {
    render() {
      return (
        <Grid>
          <Row>
            <Col md={8}>
              <PasswordField />
            </Col>
            <Col md={4}>
              <StrengthMeter />
            </Col>
          </Row>
        </Grid>
      );
    }
  }

  class StrengthMeter extends React.Component {
    render() { return null; }
  }

  class PasswordField extends React.Component {
    render() { return null; }
  }

So far, so good. In this step you have a "framework" to work with. Another step is to add data. Default properties technique can be very helpful here. _Good password principles_ will have a name and a predicate to check whether a principle is satisfied or not. Such predicate will get a password as an argument - it's a simple plain JavaScript function.

{lang="javascript"}
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

As you can see, the default principles are taken straight from the mockup. You can provide your own while instantiating the `PasswordInput` component, making it powerfully configurable for free.

Since in this stage you got two logical components to implement, you need to choose one. In this recipe `StrengthMeter` will be implemented as the first one.

Let's render _something_. Since in the static mockup the whole strength meter is wrapped within a Bootstrap's Panel, let's render the empty panel at first. Remember to import `Panel` component class from the React-Bootstrap package:

{lang="javascript"}
    import { Grid, Row, Col, Panel } from 'react-bootstrap';

Then you can use it:

{lang="javascript"}
    class StrengthMeter extends React.Component {
      render() { return (<Panel />); }
    }

Let's start with implementing a static list of principles, without marking them in color as satisfied/not satisfied. It is a good starting point to iterate towards the full functionality. To do so, you need to pass principles list to the `StrengthMeter` component. To do so, simply pass the `principles` property from the `PasswordInput` component:

{lang="javascript"}
    class PasswordInput extends React.Component {
      render() {
        let { goodPasswordPrinciples } = this.props;

        return (
          <Grid>
            <Row>
              <Col md={8}>
                <PasswordField />
              </Col>
              <Col md={4}>
                <StrengthMeter principles={goodPasswordPrinciples} />
              </Col>
            </Row>
          </Grid>
        );
      }
    }

Now the data can be used to render a list of principles:

{lang="javascript"}
    class StrengthMeter extends React.Component {
      render() {
        return (
          let { principles } = this.props;

          <Panel>
            <ul>
              {principles.map(principle =>
              <li>
                <small>
                  {principle.label}
                </small>
              </li>
              )}
            </ul>
          </Panel>
        ); 
      }
    }

Notice how `<small>` is used inside of the list element. That's how it is done within the static mockup - and ultimately you want to achieve the same effect.

So far, so good. A tiny step to make is to add a header just like on the mockup:

{lang="javascript"}
    class StrengthMeter extends React.Component {
      render() {
        return (
          let { principles } = this.props;

          <Panel>
            <h5>A good password is:</h5>
            <ul>
              {principles.map(principle =>
              <li>
                <small>
                  {principle.label}
                </small>
              </li>
              )}
            </ul>
          </Panel>
        ); 
      }
    }

Now it's time to implement logic for coloring this list whether a given principle is satisfied or not. Since satisfying process needs the `password` as an argument, it's time to introduce the `password` variable in the `PasswordInput` state. It lies within the state because it'll change in a process - and will trigger appropriate re-renders.

To do so, you need to introduce a constructor to the `PasswordInput` component class which will set the default `password` variable to `''`. Let's do it!

{lang="javascript"}
    class PasswordInput extends React.Component {
      constructor(props) {
        super(props);
        this.state = { password: '' };
      }

      render() {
        let { goodPasswordPrinciples } = this.props;

        return (
          <Grid>
            <Row>
              <Col md={8}>
                <PasswordField />
              </Col>
              <Col md={4}>
                <StrengthMeter principles={goodPasswordPrinciples} />
              </Col>
            </Row>
          </Grid>
        );
      }
    }

So far, so good. But you need the `password` information within the `StrengthMeter`.

{lang="javascript"}
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
              <Col md={8}>
                <PasswordField />
              </Col>
              <Col md={4}>
                <StrengthMeter principles={goodPasswordPrinciples} password={password} />
              </Col>
            </Row>
          </Grid>
        );
      }
    }


## What's next?

## Summary


