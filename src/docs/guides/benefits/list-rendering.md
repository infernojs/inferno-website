# List Rendering

Inferno has two ways of rendering lists: Keyed algorithm and Non keyed algorithm. Choosing which one to use is up to the developer, and therefore it is important to understand the differences between them. The main difference is that keyed lists will preserve the internal state of list items. For example focus, value, (data-attributes) etc. will remain as they were before and after rendering as long as a specific list item is still rendered.

## Keyed algorithm

The basic idea behind keyed algorithm is to minimize the number of patch operations. This performs better when changes between lists are minimal. `key` is a special property that is not rendered to HTML DOM. It can be anything from string to number and is only used to track a specific node. Typically this is id/guid related to the data you are rendering. Remember that `key` needs to be unique only across its siblings, not globally.

## Non keyed algorithm

By default Inferno uses non keyed algorithm on every array. It goes through all nodes in order. This is the better choice when you don't need to preserve internal state of list items, and no items are added or removed from the middle of the array. Non keyed algorithm has an advantage in performance when rendering static lists.

### Examples and differences

Example1: Keyed only appending
```javascript
1st render: <div><span key="1">first</span></div>
2nd render: <div><span key="1">first</span><span key="2">second</span></div>
=> [appendNode <span>second</span>]
```


Example1: NonKeyed only appending (better)
```javascript
1st render: <div><span>first</span></div>
2nd render: <div><span>first</span><span>second</span></div>
=> [appendNode <span>second</span>]
```


Example2: Keyed moving location of node (better)
```javascript
1st render: <div><span key="1">first</span></div>
2nd render: <div><span key="2">second</span><span key="1">first</span></div>
=> [insertNode <span>second</span>]
```

Example2: NonKeyed moving location of node
```javascript
1st render: <div><span>first</span></div>
2nd render: <div><span>second</span><span>first</span></div>
=> [change text 'first' => 'second', appendNode <span>first</span>]
```


Example3: Keyed complex changes
```javascript
1st render: <div><span key="1">first</span><span key="2">second</span><span key="3">third</span></div>
2nd render: <div><span key="2">secondchanged</span><span key="1">first</span></div>
=> [removeNode <span>third</span>, (moveNode <span>second</span> + change text: 'secondchanged')]
```
In this example the keyed version will preserve state of "second span" and just change the text.


Example3: NonKeyed complex changes
```javascript
1st render: <div><span>first</span><span>second</span><span>third</span></div>
2nd render: <div><span>secondchanged</span><span>first</span></div>
=> [change text 'first' => 'secondchanged', change text 'second' => 'first', removeNode <span>third</span>]
```
In this example nonkeyed version will patch nodes in order and lose internal states.


## JSX Compile time flags

JSX Plugin will by default add childrenTypes based on the nested elements and generally does this well. However, when children are built dynamically, they are marked with unknown ChildrenType which means Inferno will look up the children type runtime.
You can define children type at the root node level. This is very useful when children are built dynamically and no other compile time information is available. All the special flags are prefixed with `$` -sign and written in PascalCase so are easily recognized.

```javascript
import { Component, render } from 'inferno';

const root = document.getElementById('root')

class MyComponent extends Component {
  constructor(props) {
    super(props)
  }

  buildItems() {
    /* Items built using some logic */
    return [<div key="2">2</div>, <span key="#3">three</span>]
  }

  render() {
    return (
      <div $HasKeyedChildren>
        {this.buildItems()}
      </div>
    )
  }
}

render(<MyComponent />, root)
```

In the above example MyComponent returns div which has a special attribute `$HasKeyedChildren`. This attribute changes vNode flags to tell Inferno its children are always keyed.
This results in better runtime performance. If the shape of children needs to be changed runtime then there is special property called `$ChildFlag={expression}`. JSX specific children values are `$HasKeyedChildren`, `$HasNonKeyedChildren` and `$HasVNodeChildren`.
When not using JSX, children properties can be defined using [inferno-vnode-flags](/docs/api/inferno-vnode-flags). See its documentation for more information.
