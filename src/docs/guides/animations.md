# Animations
As of **Inferno 8.0.0** there are three new lifecycle events that can be used for animations:

Class components:
- componentDidAppear(dom)
- componentWillDisappear(dom, callback)
- componentWillMove(parentVNode, parent, dom, next, props)

Functional components:
- onComponentDidAppear(dom, props)
- onComponentWillDisappear(dom, props, callback)
- onComponentWillMove(parentVNode, parent, dom, next, props)

The package `inferno-animation` provides a base class and helper methods that implement these to allow you to easily convert components to animated components. See the API docs for inferno-animation.

When mounting animated components that in turn contain animated components only the outer most animation will be triggered.

Inferno also supports global animations. These allow you to animate a component between positions on two different "pages". Technincally this means they don't have the same parent element. The logo on the [Inferno website](https://infernojs.org/) is a global animation.

Your animated component will look something like this:

```JSX
import { AnimatedComponent } from 'inferno-animation';

class MyComponent extends AnimatedComponent {
  render() {
    return <div className={this.props.className}>{this.children}</div>
  }
}
```

And you use it in your code like this `<MyComponent animation="HeightAndFade">...</MyComponent>`. To define what your animation looks like you need to specify it using CSS. The animation name **HeightAndFade** gets a couple of suffixes:

```scss
.MyComponent {
  display: block;
  box-sizing: border-box; // important
  margin: 0; // important
  padding: 0.5rem;
  border: 1px solid black;
  background-color: white;
  overflow-y: hidden; // hide any overflow on animation axis
}

.HeightAndFade {
  &-enter,
  &-leave-end { // Start and end with element collapsed and fully transparent
    height: 0;
    opacity: 0;
  }

  &-enter-active {
    transition: all 0.5s ease-in;
  }

  &-leave-active {
    transition: all 0.2s ease-out;
  }

  &-enter-end,
  &-leave { // Animate to and from full height with full opacity
    height: auto;
    opacity: 1;
  }
}
```

Finally use the component in your code:

```JSX
// Add the component with above defined animation
inferno.render(<MyComponent animation=“HeightAndFade”>This container is animated</MyComponent>, document.body);

// Remove the component with above defined animation
setTimeout(() => {
  inferno.render(null, document.body);
}, 2000);

// You would of course normally do this in your render method.
```

See the [animation API-docs](https://www.infernojs.org/docs/api/inferno-animation) and [examples in the Inferno Github repos](https://github.com/infernojs/inferno/tree/master/docs) for more on how to unlock the power of animations in Inferno.