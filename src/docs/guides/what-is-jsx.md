What is JSX?
---
The following declaration style:
```javascript
const element = <h1>Hello, Inferno!</h1>
```
is called JSX, and it is a syntax extension to JavaScript. Much like React, you can use JSX with Inferno to describe what the UI should look like. JSX may remind you of a template language, but it comes with the full power of JavaScript.

JSX produces Inferno `VNodes`. Below, you can find the basics of JSX necessary to get you started.

---

### Embedding Expressions in JSX

You can embed any JavaScript expression in JSX by wrapping it in curly braces.

For example, 2 + 2, user.name, and formatName(user) are all valid expressions:
```javascript
import { render } from 'inferno';

function formatName(user) {
  return user.firstName + ' (The ' + user.middleName + ') ' + user.lastName;
}

const user = {
  firstName: 'Dominic',
  middleName: 'Infernimator',
  lastName: 'Gannaway'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

render(
  element,
  document.getElementById('root')
);
```

We split JSX over multiple lines for readability. While it isn't mandatory, when doing this, you should also wrap these lines in parentheses to avoid any issues with automatic semicolon insertion.

---

### JSX is an Expression Too
After compilation, JSX expressions become regular JavaScript objects.

This means that you can use JSX inside if statements and for loops, assign it to variables, accept it as arguments, and return it from functions:
```javascript
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```
---

### Specifying Attributes with JSX
You may use quotes to specify string literals as attributes:

```javascript
const element = <div tabIndex="0"></div>;
```
You may also use curly braces to embed a JavaScript expression in an attribute:
```javascript
const element = <img src={user.avatarUrl}></img>;
```
---

### Specifying Children with JSX
If a tag is empty, you can close it immediately with />, like XML:
```javascript
const element = <img src={user.avatarUrl} />;
```
JSX tags may contain children:
```javascript
const element = (
  <div>
    <h1>Hi!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```
Caveat:
Since JSX is more like JavaScript than HTML, InfernoDOM uses a camelCase property naming convention instead of HTML attribute names.
For example, the `class` attribute becomes `className` in JSX, and the `tabindex` attribute becomes `tabIndex`.

---

### Inferno Prevents Injection Attacks
It is safe to embed user input in JSX:
```javascript
const title = response.potentiallyMaliciousInput
// This is safe:
const element = <h1>{title}</h1>
```
By default, Inferno escapes any values before rendering them. Thus it ensures that you can never inject anything that's not explicitly written in your application. Everything is converted to a string before being rendered. This helps prevent XSS (cross-site-scripting) attacks.

---

### JSX Represents Objects
Babel compiles JSX down to `Inferno.createVNode()` calls.

These two examples are identical:

```javascript
const element = (
  <h1 className="greeting">
    Hello, Inferno!
  </h1>
);

const element = Inferno.createVNode(
  2,
  'h1',
  'greeting',
  'Hello, Inferno!'
);

```

`Inferno.createVNode()` performs a few checks to help you write bug-free code but essentially it creates an object like this:

```javascript
// Note: this structure is simplified
const element = {
    flags: 2,
    type: 'h1',
    className: 'greeting',
    children: 'Hello Inferno!',
    props: {
        onClick: method,
        'data-attribute': 'Hello Inferno community!'
    }
};
```

These objects constitute the "Inferno VirtualDOM". You can think of this as lightweight descriptions of what you want to render. Inferno reads this and uses it to construct the DOM and keep it up to date.

We will explore rendering Inferno VNodes to the DOM in the next section.

We recommend searching for a "Babel" syntax scheme for your editor of choice so that both ES2015 and JSX code are properly highlighted.
