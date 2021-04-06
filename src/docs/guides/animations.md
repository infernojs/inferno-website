# Animations
Since **Inferno 7.5.0** there are two new lifecycle events that can be used for animations.

Inferno has class component lifecycle events that allow you to animate components on mount and unmount:

- componentDidAppear(dom)
- componentWillDisappear(dom, callback)

The package `inferno-animation` provides a base class that implement these to allow you to easily convert components to animated components. See the API docs for inferno-animation.

When mounting animated components that in turn contain animated components only the outer most animation will be triggered.

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