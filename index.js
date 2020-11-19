const ReactDOM = {
  render(reactElement, rootElement) {
    rootElement.appendChild(reactElement);
  },
};

const React = {
  createElement(component, attributes, content) {
    if (typeof component === "string") {
      let element = document.createElement(component);
      if (content) {
        element.innerHTML = content;
      }
      return element;
    }

    let reactComponent = new component(attributes);

    return reactComponent.render();
  },
  Component: class Component {
    constructor(props) {
      this.props = props;
    }
  },
};

class App extends React.Component {
  render() {
    return React.createElement(Header, { text: "Hello, world!" });
  }
}

class Header extends React.Component {
  render() {
    {
      /* <h1>{this.props.text}</h1> */
    }
    return React.createElement("h1", {}, this.props.text);
  }
}

ReactDOM.render(React.createElement(App), document.getElementById("root"));

/* 
  Todos:
  1. Set css class for elements (and other attributes)
  2. Render multiple children in an element
*/
