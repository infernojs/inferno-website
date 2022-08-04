# Inferno Animation API
This package provides CSS-animations when components are added and removed.

Requires Inferno >=8.0.0

To migrate from earlier versions of inferno-animation, read the last section on this page.

```
npm install inferno-animation --save
```

## Using inferno-animation
As of **Inferno 8.0.0** there is support for animation lifecycle events:

Class components:
- componentDidAppear(dom)
- componentWillDisappear(dom, callback)
- componentWillMove(parentVNode, parent, dom, next, props)

Functional components:
- onComponentDidAppear(dom, props)
- onComponentWillDisappear(dom, props, callback)
- onComponentWillMove(parentVNode, parent, dom, next, props)

When you implement these, inferno will call them and pass the DOM-node of the component instance right after the component has been added or right before the component will be removed. Inferno will delay the removal of the actual DOM-node until you call the callback method allowing you to complete a removal animation.

Inferno-animation exposes three base classes to provide you with an easy way of animating your class components and helper methods to animate functional components.

- AnimatedComponent -- animates on add/remove
- AnimatedMoveComponent -- animates on move (within the same parent)
- AnimatedAllComponent -- animates on add/remove and move (within the same parent)

If you don't want to extend from one of the pre-wired components, look att src/AnimatedAllComponent.ts to see
how to wire up the three animation hooks:

- componentDidAppear
- componentWillDisappear
- componentWillMove

There are a couple of examples of animations in the main repos in the `docs/animations` and `docs/animations-demo` folder

### Global animations
Inferno also implements global animations. These allow you to animate a component between positions on two different "pages". Technically this means they don't have the same parent element. When you mount one page immediately after unmounting the other page, inferno-animation will perform a FLIP-animation between the two positions. To match the elements you use the attribute `globalAnimationKey` which accept a string.

Global animations are very simple to use, [check this example.](https://github.com/infernojs/inferno/blob/master/docs/animations-global-demo/app.js)

### Creating an animated component

#### Class Component
With inferno-animation you get a new base class called `AnimatedAllComponent`. It has all three animation lifecycle events implemented for you.

By extending this base class instead of `Component` your component will animate on add and remove using CSS-animations that you can easily customize.

```JSX
import { Component } from 'inferno';
import { AnimatedAllComponent } from 'inferno-animation';

class Animated extends AnimatedAllComponent {
  render({className, children}) {
    return <div className={className}>{children}</div>
  }
}

class MyComponent extends Component {
  render() {
    return <Animated animation="HeightAndFade">[...]</Animated>
  }
}
```

#### Functional Component
Two helper methods are exposed by inferno-animation. You can use them to activate animations on functional components.

```JSX
import { Component } from 'inferno';
import { componentDidAppear, componentWillDisappear, componentWillMove } from 'inferno-animation';

function Animated ({className, children}) {
  return <div className={this.props.className}>{children}</div>
}

class MyComponent extends Component {
  render() {
    return <Animated
      onComponentDidAppear={componentDidAppear}
      onComponentWillDisappear={componentWillDisappear}
      onComponentWillMove={componentWillMove}
      animation="HeightAndFade">[...]</Animated>
  }
}
```

In both cases, if you don't specify the property `animation="[AnimationPrefix]"` it will default to `inferno-animation`.


### Customizing CSS animations
When you specify the animation property `<MyComponent animation="HeightAndFade">...</MyComponent>` the component will animate according to the following CSS-classes when appearing in the DOM:

- .HeightAndFade-enter {}
- .HeightAndFade-enter-active { /* the actual transitions */ }
- .HeightAndFade-enter-end {}

The following when disappearing:

- .HeightAndFade-leave {}
- .HeightAndFade-leave-active { /* the actual transitions */ }
- .HeightAndFade-leave-end {}

And the following on moves:

- .HeightAndFade-move-active { /* the actual transitions */ }

There are some important rules for smooth animations. Always style the animated component with:

- box-sizing: border-box;
- margin: 0;

Border-box will allow width and height to be calculated properly. This makes it possible to animate these properties on dynamically sized components.

Setting margin to zero will prevent overlapping margins, which could cause a jump when elements are removed. The wierd behaviour with overlapping margins has been implemented in browsers since the dawn of CSS and made sense for text rendering, but is a nuisance anywhere else.

Here is an example of CSS for `<MyComponent className="MyComponent" animation="HeightAndFade">` using SCSS. In the example, the disappear (leave) animation will be a slightly quicker reverse version of the appear (enter) animation:

```scss
.MyComponent {
  display: block;
  box-sizing: border-box;
  margin: 0;
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
    pointer-events: none; /* (optional) prevent hover to fire transition events causing early termination */
  }

  &-leave-active {
    transition: all 0.2s ease-out;
    pointer-events: none; /* (optional) prevent hover to fire transition events causing early termination */
  }

  &-enter-end,
  &-leave { // Animate to and from full height with full opacity
    height: auto;
    opacity: 1;
  }

  &-move-active {
    /* Move animation transitions */
    transition: transform 1.5s;
    z-index: 1;
  }
}
```

### The animation lifecycle of an animation handler
This is an explanation of how the helper methods in inferno-animation work. The lifecycle of an animation consists of five phases:

1. Measure width and height

Explicit height and width are needed in order to animate height and width.

NOTE: If the animated component contains images and those images affect the size of the component, make sure that the images get their proper sizes even if the image hasn't been loaded. You can use padding-tricks or pass the size through attributes to the image element.

2. Set the starting state (in a disappear animation we also set height and width)

The starting state is defined by `...-enter` or `...-leave`.

3. Create transition listener and activate the CSS-transitions

Activating the transition after the starting state is set allows the starting state to be rendered instantly.

4. Set the ending state (in an appear animation we also set height and width; in a disappear animation we remove height and width)

The transitions from phase 3 will now control the animation between the starting and ending state. When all the transitions have completed the transition listener will finish with phase 5.

5. Clean up

When the animation has completed, we remove the remaining CSS-classes and remove height and width if they have been set.

You can implement child animations using the CSS-classes. Make sure they are quicker than the main animation otherwise they will jump during clean up in phase 5.

### Nested animations
If you mount an animated component that in turn contains animated components, only the outermost animation will trigger. In other words, if you mount an animated page containing a list of animated rows, only the page will animate. You can use this effect to block animations on first render by making sure your root component inherits from `AnimatedComponent` and just skipping the transitions.

If you want to animate child components you can [look att this example.](https://github.com/infernojs/inferno/tree/master/docs/animations-demo-inner)

### Creating a custom animated component
If you want to implement another type of animation, such as Bootstrap 4 animations, you can implement the lifecycle events yourself. **Make sure you use the helper methods** exposed by `inferno-animation` unless you really, really, know what you are doing. The helper methods will make the code more readable and contains some hard earned wisdom.

```js
import { 
  addClassName, // add one or more CSS-classes, separate by space
  removeClassName, // remove one or more CSS-classes, separated by space

  forceReflow, // cause a layout reflow to avoid unwanted layout optimisations

  registerTransitionListener, // register a smart transition listener with dynamically calculated timeout as fallback

  getDimensions, // get the size of the node
  setDimensions, // set the size 
  clearDimensions, // clear style attribute properties height and width

  setDisplay, // set the style attribute property display
} from 'inferno-animation';
```

**Animations are done entirely outside of Inferno's control.** You can't use `this.setState()` to animate the component. All you get is the root DOM-node, and then you have to do everything in your code.

**If you implement your own animated base class, share it across projects.** This makes it easy for you to maintain the animations when we extend the functionality of inferno-animation in the future.

**Make sure you implement a fallback timeout** in case the transitions fail for some reason, otherwise you will be leaking DOM-nodes. Inferno won't break due to these leaking DOM-nodes, but you could end up with strange styling bugs if you rely on certain CSS-selectors.

## Migration from inferno-animation <8.0
To migrate to the 8.0 version of inferno-animation there are some quick solutions.

Implement your own `<Animated>` component and rename the attribute `prefix` to `animation` in places where you use it. The animations will work exactly the same.

```JavaScript
class Animated extends AnimatedComponent {
  render ({className, children}) {
    return (
      <div className={className}>{children}</div>
    )
  }
}
```

If you have used the methods `animateOnAdd` and `animateOnRemove` in your own class component, you can extend `AnimatedComponent` instead and rename the attribute `prefix` to `animation` when using it.

If you have implemented your own animated functional component you follow the same pattern for functional component animations using the two new helper methods `componentDidAppear` and `componentWillDisappear`.
