(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var self = undefined;
var myArray = [];
var firebaseRef = new Firebase("https://aconceptaday.firebaseio.com/");
var MainApp = React.createClass({
  displayName: "MainApp",

  getInitialState: function getInitialState() {
    return { dataList: "", youtubeLink: "", types: "", equations: "", googleLink: "" };
  },

  componentWillMount: function componentWillMount() {
    this.getData();
  },

  sendToFirebase: function sendToFirebase() {
    this.setState({ loaderText: " submitting data---->please wait" });
    var d = new Date();
    firebaseRef.child(this.state.topic).set({ topic: this.state.topic, youtubeLink: this.state.youtubeLink, types: this.state.types, equations: this.state.equations, googleForm: this.state.googleLink }, (function (error) {
      if (error !== null) {
        alert("Some Error Occured Try Again");
        this.resetForm();
      } else {
        this.setState({ showDetails: true });
        this.resetForm();
      }
    }).bind(this));
  },

  resetForm: function resetForm() {
    this.setState({ topic: "", youtubeLink: "", types: "", equations: "", googleLink: "", showDetails: false });
  },

  getData: function getData() {
    firebaseRef.orderByChild("topic").on("child_added", (function (snapshot) {
      console.log(snapshot.val());
      myArray.push(snapshot.val());
      this.setState({ topic: myArray });
    }).bind(this));
  },

  handleSearch: function handleSearch(topic) {
    firebaseRef.orderByChild("topic").equalTo(topic).on("child_added", (function (snapshot) {
      var myArra = [];
      myArra.push(snapshot.val());
      this.setState({ moreDetails: myArra, showDetails: true });
    }).bind(this));
  },

  handleBack: function handleBack() {
    this.setState({ showDetails: false });
  },

  handleChange: function handleChange(field, e) {
    this.setState({ showDetails: false, loaderText: 'Enter the above details' });
    if (field === "topic") {
      this.setState({ topic: e.target.value });
    } else if (field === "video") {
      this.setState({ youtubeLink: e.target.value });
    } else if (field === "types") {
      this.setState({ types: e.target.value });
    } else if (field === "equation") {
      this.setState({ equations: e.target.value });
    } else if (field === "google") {
      this.setState({ googleLink: e.target.value });
    }
  },

  render: function render() {
    var _this = this;

    console.log("array", myArray);
    var tileStyle = {
      marginTop: 10
    };

    var singleButton = {
      position: "absolute",
      marginLeft: -850,
      marginTop: 500,
      marginBottom: 10,
      fontSize: 20
    };

    var multipleButton = {
      position: "absolute",
      marginLeft: -550,
      marginTop: 500,
      marginBottom: 10,
      fontSize: 20
    };

    var loaderSize = {
      fontSize: 20,
      color: "white"
    };

    var setPadding = {
      alignItems: "center",
      paddingTop: 20
    };

    var background4 = {
      backgroundColor: "white"
    };

    var backButton = {
      backgroundColor: "#E91E63",
      color: "white",
      fontStyle: "bold"
    };

    if (!this.state.showDetails && this.state.topic) {
      return React.createElement(
        "div",
        { className: "row", style: setPadding },
        React.createElement(
          "div",
          { className: "col-md-12" },
          React.createElement(
            "ul",
            { className: "list-group" },
            React.createElement(
              "a",
              { href: "#", className: "list-group-item active" },
              "Select Topic"
            ),
            this.state.topic.map(function (item, index) {
              return React.createElement(
                "li",
                { className: "list-group-item", onClick: _this.handleSearch.bind(_this, item.topic) },
                item.topic
              );
            })
          )
        )
      );
    } else if (this.state.showDetails) {
      return React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-md-12", style: background4 },
          React.createElement(
            "button",
            { type: "button", className: "btn btn-danger btn-block", onClick: this.handleBack },
            "Go to Main List"
          ),
          React.createElement(
            "ul",
            { className: "list-group" },
            this.state.moreDetails.map(function (item, index) {
              return React.createElement(Card, { title: item.topic, equations: item.equations, problemTypes: item.types, youtubeLink: item.youtubeLink, googleLink: item.googleForm });
            })
          )
        )
      );
    } else {
      return React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-md-12 text-center" },
          React.createElement(
            "p",
            { style: loaderSize },
            "Loading Please Wait"
          )
        )
      );
    }
  }
});

var Card = React.createClass({
  displayName: "Card",

  render: function render() {
    var tileStyle = {
      marginTop: 10
    };

    var singleButton = {
      position: "absolute",
      marginLeft: -850,
      marginTop: 500,
      marginBottom: 10,
      fontSize: 20
    };

    var multipleButton = {
      position: "absolute",
      marginLeft: -550,
      marginTop: 500,
      marginBottom: 10,
      fontSize: 20
    };

    var setPadding = {
      paddingTop: 20
    };

    var background1 = {
      backgroundColor: "#F5F5F5",
      color: "black"
    };

    var background2 = {
      backgroundColor: "#009688",
      color: "white"
    };

    var background3 = {
      backgroundColor: "#FFF59D",
      color: "white"
    };

    return React.createElement(
      "div",
      { className: "col-md-12", style: background1 },
      React.createElement(
        "div",
        { className: "jumbotron", style: background1 },
        React.createElement(
          "ul",
          { className: "list-group" },
          this.props.youtubeLink ? React.createElement(VideoCard, { url: this.props.youtubeLink, title: this.props.title }) : React.createElement("div", null)
        ),
        React.createElement(
          "ul",
          { className: "list-group" },
          React.createElement(
            "a",
            { href: "#", className: "list-group-item list-group-item-success" },
            "Equations"
          ),
          this.props.equations.split("\n").map(function (i) {
            return React.createElement(
              "li",
              { className: "list-group-item" },
              i
            );
          })
        ),
        React.createElement(
          "ul",
          { className: "list-group" },
          React.createElement(
            "a",
            { href: "#", className: "list-group-item list-group-item-info" },
            "Problem Types"
          ),
          this.props.problemTypes.split("\n").map(function (i) {
            return React.createElement(
              "li",
              { className: "list-group-item" },
              i
            );
          }),
          React.createElement(
            "button",
            { type: "button", className: "btn btn-default btn-block" },
            React.createElement(
              "a",
              { href: this.props.googleLink },
              "Practise Questions"
            )
          )
        ),
        React.createElement(
          "h5",
          { className: "text-center" },
          "Developed and maintained by WaterLabs"
        )
      )
    );
  }
});

var VideoCard = React.createClass({
  displayName: "VideoCard",

  render: function render() {
    var tileStyle = {
      marginTop: 10
    };

    var singleButton = {
      position: "absolute",
      marginLeft: -850,
      marginTop: 500,
      marginBottom: 10,
      fontSize: 20
    };

    var multipleButton = {
      position: "absolute",
      marginLeft: -550,
      marginTop: 500,
      marginBottom: 10,
      fontSize: 20
    };

    var setPadding = {
      alignItems: "center",
      paddingLeft: 20,
      paddingTop: 20,
      paddingRight: 20,
      paddingBottom: 20
    };
    var background4 = {
      backgroundColor: "#FFEB3B"
    };
    return React.createElement(
      "div",
      { className: "col-md-12" },
      React.createElement(
        "div",
        { className: "embed-responsive embed-responsive-4by3" },
        React.createElement("iframe", { id: "video", className: "embed-responsive-item", src: this.props.url, allowFullScreen: true })
      )
    );
  }
});

ReactDOM.render(React.createElement(MainApp, null), document.getElementById('content'));

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9zb29yYWovRGVza3RvcC9hbG1hYmFzZS9BcHRpdHVkZSBWaWV3ZXIvcm9vdC9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUksSUFBSSxZQUFPLENBQUM7QUFDaEIsSUFBSSxPQUFPLEdBQUMsRUFBRSxDQUFDO0FBQ2YsSUFBSSxXQUFXLEdBQUcsSUFBSSxRQUFRLENBQUMsc0NBQXNDLENBQUMsQ0FBQztBQUN2RSxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFFOUIsaUJBQWUsRUFBRSwyQkFBVztBQUMzQixXQUFPLEVBQUMsUUFBUSxFQUFHLEVBQUUsRUFBRSxXQUFXLEVBQUMsRUFBRSxFQUFFLEtBQUssRUFBQyxFQUFFLEVBQUUsU0FBUyxFQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUMsRUFBRSxFQUFDLENBQUM7R0FDL0U7O0FBRUQsb0JBQWtCLEVBQUUsOEJBQVc7QUFDN0IsUUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0dBQ2hCOztBQUVBLGdCQUFjLEVBQUUsMEJBQVU7QUFDeEIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFVBQVUsRUFBQyxrQ0FBa0MsRUFBQyxDQUFDLENBQUM7QUFDL0QsUUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUNuQixlQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRyxLQUFLLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFB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LFFBQVEsQ0FBQyxNQUFNLENBQ2Isb0JBQUMsT0FBTyxPQUFHLEVBQ1gsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FDbkMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgc2VsZiA9IHRoaXM7XHJcbnZhciBteUFycmF5PVtdO1xyXG52YXIgZmlyZWJhc2VSZWYgPSBuZXcgRmlyZWJhc2UoXCJodHRwczovL2Fjb25jZXB0YWRheS5maXJlYmFzZWlvLmNvbS9cIik7XHJcbnZhciBNYWluQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICByZXR1cm4ge2RhdGFMaXN0IDogXCJcIiwgeW91dHViZUxpbms6XCJcIiwgdHlwZXM6XCJcIiwgZXF1YXRpb25zOlwiXCIsIGdvb2dsZUxpbms6XCJcIn07XHJcbiB9LFxyXG5cclxuIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgIHRoaXMuZ2V0RGF0YSgpO1xyXG4gfSxcclxuXHJcbiAgc2VuZFRvRmlyZWJhc2U6IGZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtsb2FkZXJUZXh0OlwiIHN1Ym1pdHRpbmcgZGF0YS0tLS0+cGxlYXNlIHdhaXRcIn0pO1xyXG4gICAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgZmlyZWJhc2VSZWYuY2hpbGQodGhpcy5zdGF0ZS50b3BpYykuc2V0KHt0b3BpYzogdGhpcy5zdGF0ZS50b3BpYywgeW91dHViZUxpbms6dGhpcy5zdGF0ZS55b3V0dWJlTGluayAsIHR5cGVzOnRoaXMuc3RhdGUudHlwZXMsIGVxdWF0aW9uczp0aGlzLnN0YXRlLmVxdWF0aW9ucywgZ29vZ2xlRm9ybTp0aGlzLnN0YXRlLmdvb2dsZUxpbmt9LCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICBpZiAoZXJyb3IgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgIGFsZXJ0KFwiU29tZSBFcnJvciBPY2N1cmVkIFRyeSBBZ2FpblwiKTtcclxuICAgICAgICAgICAgIHRoaXMucmVzZXRGb3JtKCk7XHJcbiAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd0RldGFpbHM6dHJ1ZX0pO1xyXG4gICAgICAgICAgICAgdGhpcy5yZXNldEZvcm0oKTtcclxuICAgICAgICAgfVxyXG4gICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICB9LFxyXG5cclxuICByZXNldEZvcm06IGZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLnNldFN0YXRlKHt0b3BpYyA6IFwiXCIsIHlvdXR1YmVMaW5rOlwiXCIsIHR5cGVzOlwiXCIsIGVxdWF0aW9uczpcIlwiLCBnb29nbGVMaW5rOlwiXCIsIHNob3dEZXRhaWxzOmZhbHNlfSk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0RGF0YTogZnVuY3Rpb24oKXtcclxuICAgIGZpcmViYXNlUmVmLm9yZGVyQnlDaGlsZChcInRvcGljXCIpLm9uKFwiY2hpbGRfYWRkZWRcIiwgZnVuY3Rpb24oc25hcHNob3QpIHtcclxuICAgICAgY29uc29sZS5sb2coc25hcHNob3QudmFsKCkpO1xyXG4gICAgICBteUFycmF5LnB1c2goc25hcHNob3QudmFsKCkpO1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHt0b3BpYzpteUFycmF5fSk7XHJcbiAgICB9LmJpbmQodGhpcykpO1xyXG4gIH0sXHJcblxyXG4gIGhhbmRsZVNlYXJjaDogZnVuY3Rpb24odG9waWMpe1xyXG4gICAgZmlyZWJhc2VSZWYub3JkZXJCeUNoaWxkKFwidG9waWNcIikuZXF1YWxUbyh0b3BpYykub24oXCJjaGlsZF9hZGRlZFwiLCBmdW5jdGlvbihzbmFwc2hvdCkge1xyXG4gICAgICAgIHZhciBteUFycmEgPSBbXTtcclxuICAgICAgICBteUFycmEucHVzaChzbmFwc2hvdC52YWwoKSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bW9yZURldGFpbHM6bXlBcnJhLCBzaG93RGV0YWlsczp0cnVlfSk7XHJcbiAgICB9LmJpbmQodGhpcykpO1xyXG4gIH0sXHJcblxyXG4gIGhhbmRsZUJhY2s6IGZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtzaG93RGV0YWlsczpmYWxzZX0pO1xyXG4gIH0sXHJcblxyXG5cclxuICBoYW5kbGVDaGFuZ2U6IGZ1bmN0aW9uKGZpZWxkLCBlKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtzaG93RGV0YWlsczogZmFsc2UsIGxvYWRlclRleHQ6J0VudGVyIHRoZSBhYm92ZSBkZXRhaWxzJ30pO1xyXG4gICAgaWYoZmllbGQ9PT1cInRvcGljXCIpe1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHt0b3BpYzogZS50YXJnZXQudmFsdWV9KTtcclxuICAgIH1lbHNlIGlmKGZpZWxkPT09XCJ2aWRlb1wiKXtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7eW91dHViZUxpbms6IGUudGFyZ2V0LnZhbHVlfSk7XHJcbiAgICB9ZWxzZSBpZihmaWVsZD09PVwidHlwZXNcIil7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3R5cGVzOiBlLnRhcmdldC52YWx1ZX0pO1xyXG4gICAgfWVsc2UgaWYoZmllbGQ9PT1cImVxdWF0aW9uXCIpe1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtlcXVhdGlvbnM6IGUudGFyZ2V0LnZhbHVlfSk7XHJcbiAgICB9ZWxzZSBpZihmaWVsZD09PVwiZ29vZ2xlXCIpe1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtnb29nbGVMaW5rOiBlLnRhcmdldC52YWx1ZX0pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcImFycmF5XCIsIG15QXJyYXkpO1xyXG4gICAgdmFyIHRpbGVTdHlsZSA9IHtcclxuICAgICAgbWFyZ2luVG9wOjEwXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNpbmdsZUJ1dHRvbiA9IHtcclxuICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcclxuICAgICAgbWFyZ2luTGVmdDotODUwLFxyXG4gICAgICBtYXJnaW5Ub3A6IDUwMCxcclxuICAgICAgbWFyZ2luQm90dG9tOiAxMCxcclxuICAgICAgZm9udFNpemU6IDIwLFxyXG4gICAgfVxyXG5cclxuICAgIHZhciBtdWx0aXBsZUJ1dHRvbiA9IHtcclxuICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcclxuICAgICAgbWFyZ2luTGVmdDotNTUwLFxyXG4gICAgICBtYXJnaW5Ub3A6IDUwMCxcclxuICAgICAgbWFyZ2luQm90dG9tOiAxMCxcclxuICAgICAgZm9udFNpemU6IDIwLFxyXG4gICAgfVxyXG5cclxuICAgIHZhciBsb2FkZXJTaXplID0ge1xyXG4gICAgICBmb250U2l6ZTogMjAsXHJcbiAgICAgIGNvbG9yOlwid2hpdGVcIixcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2V0UGFkZGluZyA9IHtcclxuICAgICAgYWxpZ25JdGVtczpcImNlbnRlclwiLFxyXG4gICAgICBwYWRkaW5nVG9wOjIwLFxyXG4gICAgfVxyXG5cclxuICAgIHZhciBiYWNrZ3JvdW5kND17XHJcbiAgICAgIGJhY2tncm91bmRDb2xvcjpcIndoaXRlXCJcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYmFja0J1dHRvbj17XHJcbiAgICAgIGJhY2tncm91bmRDb2xvcjpcIiNFOTFFNjNcIixcclxuICAgICAgY29sb3I6XCJ3aGl0ZVwiLFxyXG4gICAgICBmb250U3R5bGU6XCJib2xkXCJcclxuICAgIH1cclxuXHJcbiAgICBpZighdGhpcy5zdGF0ZS5zaG93RGV0YWlscyYmdGhpcy5zdGF0ZS50b3BpYyl7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIiBzdHlsZT17c2V0UGFkZGluZ30+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMTJcIj5cclxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cFwiPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW0gYWN0aXZlXCI+XHJcbiAgICAgICAgICAgIFNlbGVjdCBUb3BpY1xyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgdGhpcy5zdGF0ZS50b3BpYy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgIHJldHVybiAoPGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbVwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2VhcmNoLmJpbmQodGhpcyxpdGVtLnRvcGljKX0+e2l0ZW0udG9waWN9PC9saT4pO1xyXG4gICAgICAgICAgICAgfSlcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH1lbHNlIGlmKHRoaXMuc3RhdGUuc2hvd0RldGFpbHMpe1xyXG4gICAgICByZXR1cm4oXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0xMlwiIHN0eWxlPXtiYWNrZ3JvdW5kNH0+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXIgYnRuLWJsb2NrXCIgb25DbGljaz17dGhpcy5oYW5kbGVCYWNrfT5HbyB0byBNYWluIExpc3Q8L2J1dHRvbj5cclxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cFwiPlxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAgdGhpcy5zdGF0ZS5tb3JlRGV0YWlscy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgIHJldHVybiAoPENhcmQgdGl0bGU9e2l0ZW0udG9waWN9IGVxdWF0aW9ucz17aXRlbS5lcXVhdGlvbnN9IHByb2JsZW1UeXBlcz17aXRlbS50eXBlc30geW91dHViZUxpbms9e2l0ZW0ueW91dHViZUxpbmt9IGdvb2dsZUxpbms9e2l0ZW0uZ29vZ2xlRm9ybX0vPik7XHJcbiAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgIH1cclxuICAgICAgICA8L3VsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHJldHVybihcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTEyIHRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICA8cCBzdHlsZT17bG9hZGVyU2l6ZX0+TG9hZGluZyBQbGVhc2UgV2FpdDwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxuXHJcblxyXG52YXIgQ2FyZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHRpbGVTdHlsZSA9IHtcclxuICAgICAgbWFyZ2luVG9wOjEwXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNpbmdsZUJ1dHRvbiA9IHtcclxuICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcclxuICAgICAgbWFyZ2luTGVmdDotODUwLFxyXG4gICAgICBtYXJnaW5Ub3A6IDUwMCxcclxuICAgICAgbWFyZ2luQm90dG9tOiAxMCxcclxuICAgICAgZm9udFNpemU6IDIwLFxyXG4gICAgfVxyXG5cclxuICAgIHZhciBtdWx0aXBsZUJ1dHRvbiA9IHtcclxuICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcclxuICAgICAgbWFyZ2luTGVmdDotNTUwLFxyXG4gICAgICBtYXJnaW5Ub3A6IDUwMCxcclxuICAgICAgbWFyZ2luQm90dG9tOiAxMCxcclxuICAgICAgZm9udFNpemU6IDIwLFxyXG4gICAgfVxyXG5cclxuICAgIHZhciBzZXRQYWRkaW5nID0ge1xyXG4gICAgICBwYWRkaW5nVG9wOiAyMCxcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYmFja2dyb3VuZDE9e1xyXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6XCIjRjVGNUY1XCIsXHJcbiAgICAgIGNvbG9yOlwiYmxhY2tcIlxyXG4gICAgfVxyXG5cclxuICAgIHZhciBiYWNrZ3JvdW5kMj17XHJcbiAgICAgIGJhY2tncm91bmRDb2xvcjpcIiMwMDk2ODhcIixcclxuICAgICAgY29sb3I6XCJ3aGl0ZVwiXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGJhY2tncm91bmQzPXtcclxuICAgICAgYmFja2dyb3VuZENvbG9yOlwiI0ZGRjU5RFwiLFxyXG4gICAgICBjb2xvcjpcIndoaXRlXCJcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG5cdFx0ICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTEyXCIgc3R5bGU9e2JhY2tncm91bmQxfT5cclxuXHRcdFx0ICA8ZGl2IGNsYXNzTmFtZT1cImp1bWJvdHJvblwiIHN0eWxlPXtiYWNrZ3JvdW5kMX0+XHJcbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cFwiPlxyXG4gICAgICAgICAgIHt0aGlzLnByb3BzLnlvdXR1YmVMaW5rPzxWaWRlb0NhcmQgdXJsPXt0aGlzLnByb3BzLnlvdXR1YmVMaW5rfSB0aXRsZT17dGhpcy5wcm9wcy50aXRsZX0vPjo8ZGl2Lz59XHJcbiAgICAgICAgICA8L3VsPlxyXG4gIFx0XHRcdFx0PHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXBcIj5cclxuICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtIGxpc3QtZ3JvdXAtaXRlbS1zdWNjZXNzXCI+XHJcbiAgICAgICAgICAgIEVxdWF0aW9uc1xyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAge3RoaXMucHJvcHMuZXF1YXRpb25zLnNwbGl0KFwiXFxuXCIpLm1hcChpPT4ge1xyXG4gICAgICAgICAgIHJldHVybiA8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtXCI+e2l9PC9saT47XHJcbiAgICAgICB9KX1cclxuICBcdFx0XHRcdDwvdWw+XHJcbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cFwiPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLWluZm9cIj5cclxuICAgICAgICAgICAgUHJvYmxlbSBUeXBlc1xyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAge3RoaXMucHJvcHMucHJvYmxlbVR5cGVzLnNwbGl0KFwiXFxuXCIpLm1hcChpPT4ge1xyXG4gICAgICAgICAgIHJldHVybiA8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtXCI+e2l9PC9saT47XHJcbiAgICAgICB9KX1cclxuICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1ibG9ja1wiPjxhIGhyZWY9e3RoaXMucHJvcHMuZ29vZ2xlTGlua30+XHJcbiAgICAgICAgICAgUHJhY3Rpc2UgUXVlc3Rpb25zXHJcbiAgICAgICAgIDwvYT48L2J1dHRvbj5cclxuICBcdFx0XHRcdDwvdWw+XHJcbiAgICAgICAgICA8aDUgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5EZXZlbG9wZWQgYW5kIG1haW50YWluZWQgYnkgV2F0ZXJMYWJzPC9oNT5cclxuXHRcdFx0ICA8L2Rpdj5cclxuXHRcdCA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcblxyXG52YXIgVmlkZW9DYXJkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdGlsZVN0eWxlID0ge1xyXG4gICAgICBtYXJnaW5Ub3A6MTBcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2luZ2xlQnV0dG9uID0ge1xyXG4gICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxyXG4gICAgICBtYXJnaW5MZWZ0Oi04NTAsXHJcbiAgICAgIG1hcmdpblRvcDogNTAwLFxyXG4gICAgICBtYXJnaW5Cb3R0b206IDEwLFxyXG4gICAgICBmb250U2l6ZTogMjAsXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG11bHRpcGxlQnV0dG9uID0ge1xyXG4gICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxyXG4gICAgICBtYXJnaW5MZWZ0Oi01NTAsXHJcbiAgICAgIG1hcmdpblRvcDogNTAwLFxyXG4gICAgICBtYXJnaW5Cb3R0b206IDEwLFxyXG4gICAgICBmb250U2l6ZTogMjAsXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNldFBhZGRpbmcgPSB7XHJcbiAgICAgIGFsaWduSXRlbXM6XCJjZW50ZXJcIixcclxuICAgICAgcGFkZGluZ0xlZnQ6MjAsXHJcbiAgICAgIHBhZGRpbmdUb3A6MjAsXHJcbiAgICAgIHBhZGRpbmdSaWdodDogMjAsXHJcbiAgICAgIHBhZGRpbmdCb3R0b206IDIwLFxyXG4gICAgfVxyXG4gICAgdmFyIGJhY2tncm91bmQ0PXtcclxuICAgICAgYmFja2dyb3VuZENvbG9yOlwiI0ZGRUIzQlwiXHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTEyXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImVtYmVkLXJlc3BvbnNpdmUgZW1iZWQtcmVzcG9uc2l2ZS00YnkzXCI+XHJcbiAgICAgICAgICA8aWZyYW1lIGlkPVwidmlkZW9cIiBjbGFzc05hbWU9XCJlbWJlZC1yZXNwb25zaXZlLWl0ZW1cIiBzcmM9e3RoaXMucHJvcHMudXJsfSBhbGxvd0Z1bGxTY3JlZW4+PC9pZnJhbWU+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5SZWFjdERPTS5yZW5kZXIoXHJcbiAgPE1haW5BcHAgLz4sXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKVxyXG4pO1xyXG4iXX0=
