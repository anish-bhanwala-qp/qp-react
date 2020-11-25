const allComponents = {};

const ReactDOM = {
  render(reactElement, rootElement) {
    rootElement.appendChild(reactElement);
  },
};

const React = {
  createDomElement(component, attributes, contents) {
    let element = document.createElement(component);
    if (contents) {
      if (!Array.isArray(contents)) {
        contents = [contents];
      }

      contents.forEach((content) => {
        if (typeof content === "string") {
          const textNode = document.createTextNode(content);
          element.appendChild(textNode);
        } else {
          // This element is created by React.createElement
          element.appendChild(content);
        }
      });
    }
    if (attributes != null && typeof attributes === "object") {
      Object.keys(attributes).forEach((attributeName) => {
        const value = attributes[attributeName];
        // This is an event listener
        if (attributeName.startsWith("on")) {
          const eventName = attributeName.substr(2).toLowerCase();
          element.addEventListener(eventName, value);
        } else {
          element.setAttribute(attributeName, value);
        }
      });
    }

    return element;
  },
  createElement(component, attributes, contents) {
    if (typeof component === "string") {
      return this.createDomElement(component, attributes, contents);
    }

    const attributesWithChildren = { ...attributes, children: contents };

    const clazz = component;
    const key = attributes && attributes.key ? attributes.key : clazz.name;
    let classComoponent;
    if (allComponents[key]) {
      classComoponent = allComponents[key];
      classComoponent.updateProps(attributesWithChildren);
    } else {
      classComoponent = new clazz(attributesWithChildren);
      allComponents[key] = classComoponent;
    }

    let prevDom = classComoponent.render();
    classComoponent.prevDom = prevDom;

    return prevDom;
  },
  Component: class Component {
    constructor(props) {
      this.props = props;
    }

    updateProps(newProps) {
      this.props = newProps;
    }

    setState(newState) {
      this.state = newState;
      let newDom = this.render();
      this.prevDom.parentNode.replaceChild(newDom, this.prevDom);
      this.prevDom = newDom;
    }
  },
};

class Content extends React.Component {
  render() {
    return React.createElement(
      "div",
      { class: `content ${this.props.class}` },
      this.props.content
    );
  }
}

class Header extends React.Component {
  render() {
    {
      /* <h1>{this.props.text}</h1> */
    }
    return React.createElement(
      "h1",
      { class: "header", style: this.props.style, onClick: this.props.onClick },
      this.props.text
    );
  }
}

class NavLink extends React.Component {
  render() {
    return React.createElement(
      "li",
      {
        class: this.props.active ? "active" : "",
        onClick: this.props.onLinkClick,
      },
      this.props.text
    );
  }
}

class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeLinkText: "Edit" };
  }

  onLinkClick(newActiveLinkText) {
    this.setState({ activeLinkText: newActiveLinkText });
  }

  render() {
    const navLinkTexts = ["Edit", "View"];
    const navLinkElements = navLinkTexts.map((text) =>
      React.createElement(NavLink, {
        text,
        active: this.state.activeLinkText === text,
        onLinkClick: () => this.onLinkClick(text),
        key: text,
      })
    );

    return React.createElement(
      "aside",
      { class: "left-nav" },
      React.createElement("ul", null, navLinkElements)
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      style: "",
    };

    this.toggleUnderline = this.toggleUnderline.bind(this);
  }

  toggleUnderline() {
    this.setState({ style: "text-decoration: underline;" });
  }

  render() {
    const header = React.createElement(Header, {
      text: "QuestionPro",
      style: this.state.style,
      onClick: this.toggleUnderline,
    });

    const leftNav = React.createElement(LeftNav);
    const mainContent = React.createElement(Content, {
      class: "main-content",
      content: "This is the main content.",
    });

    return React.createElement("div", null, [header, leftNav, mainContent]);
  }
}

(function () {})();
class Container extends React.Component {
  render() {
    return React.createElement("div", { class: "counter-container" }, [
      this.props.children,
    ]);
  }
}

class CounterApp extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return React.createElement(
      Container,
      null,
      React.createElement("div", null, [
        `Count: ${this.state.count} `,
        React.createElement("button", { onClick: this.decrement }, "-"),
        React.createElement("button", { onClick: this.increment }, "+"),
      ])
    );
  }
}

ReactDOM.render(
  React.createElement(CounterApp),
  document.getElementById("root")
);

ReactDOM.render(React.createElement(App), document.getElementById("root2"));

/* 
  First session
  1. Create React component and render it.
  2. React component can be passed content.
  3. React component can be passed props but not all props are handled.
  4. React component can have only one child. 


  Second session
  1. Render multiple children.
  2. Pass multiple attributes to elements.
  3. Set style attribute as string.
  4. Add event listeners to react elements.
*/

/* 
  

  What is React?
  1. A component is a class that extends React.Component and implements render method.  
  2. A component can return either a component or a DOM element.
  3. A component can be passed props from the parent component.
  4. A component can have a State:
      a. State change causes component to re-render.
      b. Rendering a component shouldn't reset its state. 
      c. Rendering a component shouldn't reset state of its child components.


  Third/Fourth session
  1. Got the setState call working by caching component classes.
  2. Handle passing children in the props.

  Todos:
  1. Handle two apps on the same page.
*/
