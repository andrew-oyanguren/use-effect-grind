import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    }, 500)

    return () => {
      clearTimeout(timer);
    };
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;




/*

// ===== Using useEffect() ===== //

In this component, in both our changeHandlers, we have setFormIsValid that is getting re-rendered every time the component gets re-evaluated.
This is not good for performance, and we can use the useEffect() hook to prevent this unnecessary re-rendering.

=== useEffect() functionaily === 

We want to check validation, run setFormISValid, ony when the change handlers are fired.
So we can add the enteredValues to the dependency, and add the setFormIsValid function inside useEffect().

** NOTE: The 'set' functions, are assured by React to never change, so you can omit them from your dependency array's.



=== useEffect() Common Use Cases ===

1) Run logic when app loads
2) Run logic only when some state changes

** NOTE: Whenever you have an action that should be executed in response to another action useState, 
that is a side-effect, and where useEffect() will help you.



=== Omitted Dependencies ===

1) State 'set' functions.
2) Built in APIS like localstate/fetch
3) variables/ functions defined outside of your component.



=== useEffect() Cleanup Function ===

Sometimes you have an effect that has to do some 'cleanup' work.

* FOR EXAMPLE: 

When you are checking form validity with the onchange handler,
you are checking on each keyboard stroke. That's a lot of rendering!

TYPE PAUSE: Some functionality we can use is to check validity,
after a certain amount of time when a user stops typing.

* It's called debouncing.

=== setTimeout() ===

We can use setTimeout() to set a timer of 500ms until we execute a function.
so that you will check validity after 500ms after a typed character.

* LOGIC: The logic we are looking for is that everytime a new character is entered
we reset the timer, so that only once a use stops typing the timer will run out and fire.

== Returned Cleanup Function ==

useEffect() can return a function!

Cleanup Function: it's an arrow function that runs before the next time it fires.

in this cleanup function you can run clearTimer to clear the setTimeout() function.

*/