import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLogIn = localStorage.getItem('isLoggedIn');

    if (userLogIn === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;


/*

NOTES: 

=== Side Effects ===

React: Deals with rendering content to the screen, dynamically changing that content by managing state,
and that is done through the process of re-evaluating the component.

Side Effects: Are anything else that might be happening in your application: (Examples)

1) Sending HTTP Requests
2) Storing data in local storage
3) setting and managing Timers

* A lot of dealing with browers API stuff *

RULE OF THUMB: 

If React does not care about the task; if the task is not directly related to Reacts process,
The that task must be completed outside of the normal React evaluation and render cycle.

* NOTE: With React 'Scheduling', we need to be aware of possible blocking or delaying (react) rendering.



=== useEffect() Hook ===

useEffect hook gets two arguments:

1) Arrow Function: Holds you side-effect code; that only runs, it's block of code, when one of the depensies in the dependency array changes.
2) Dependencies Array: An array of dependencies that useffect will check if their values change, 
and if so React will re run the arrow function.



// ===== LETS CODE ===== //

1) Local Storage:

we can access local storage object and call setItem() on it.

* setItem: takes in two arguments, I think of them as key and value in JSON format.

1) string of the key
2) string value

=== How to use Local Storage ===

We want to first store our localstorage key in a varable, by using the getItem() method.

1) getItem(): Allows us to retrieve an item from local storage by 'key'.

Than after we store it in a variable, we want to check if that item is '1',
or what ever value symnolizes the user is logged in,
and if it is '1', the use the setIsLoggedIn() function to set it to true,
right from the page load.

2) removeItem(): You can remove an item from localStorage by calling removeItem, 
and passing in the key.

*/