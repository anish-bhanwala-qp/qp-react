const ReactDOM = {
  render(reactElement, rootElement) {
    rootElement.appendChild(reactElement);
  },
};

const React = {
  createElement(component, attributes, contents) {
    if (typeof component === "string") {
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
            console.log(eventName);
            element.addEventListener(eventName, value);
          } else {
            element.setAttribute(attributeName, value);
          }
        });
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
      { class: "header", style: "text-decoration: underline;" },
      this.props.text
    );
  }
}

class NavLink extends React.Component {
  render() {
    console.log(this.props);
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
    this.activeLinkText = "Edit";
  }

  onLinkClick(newActiveLinkText) {
    console.log("clicked");
    this.activeLinkText = newActiveLinkText;
  }

  render() {
    const navLinkTexts = ["Edit", "View"];
    const navLinkElements = navLinkTexts.map((text) =>
      React.createElement(NavLink, {
        text,
        active: this.activeLinkText === text,
        onLinkClick: this.onLinkClick,
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
  render() {
    const header = React.createElement(Header, { text: "QuestionPro" });
    const leftNav = React.createElement(LeftNav);
    const mainContent = React.createElement(Content, {
      class: "main-content",
      content: "This is the main content.",
    });

    return React.createElement("div", null, [header, leftNav, mainContent]);
  }
}

ReactDOM.render(React.createElement(App), document.getElementById("root"));

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
  Todos:
  1. Add state functionality (this.setState())
*/
