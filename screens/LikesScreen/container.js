import React, { Component } from "react";
import PropTypes from "prop-types";
import LikesScreen from "./presenter";

class Container extends Component {
    constructor(props){
        super(props);
        //console.log("props :: ");
        //console.log(props);
        const { navigation: { state: { params: { likes } } } } = props;
        this.state = {
            likes: likes,
            isFetching: false
        };
    }
  static propTypes = {
    likes: PropTypes.array,
    getLikes: PropTypes.func.isRequired
  };
//   state = {
//     isFetching: false
//   };
  static defaultProps = {
    likes: []
  };
  componentWillReceiveProps = nextProps => {
    if (nextProps.likes) {
      this.setState({
        isFetching: false
      });
    }
  };

  render() {
    //console.log(this.props);
    //console.log(this.state);
    return (
      <LikesScreen
        {...this.props}
        {...this.state}
        refresh={this._refresh}        
      />
    );
  }
  _refresh = () => {
    const { getLikes } = this.props;
    this.setState({
      isFetching: true
    });
    getLikes();
  }; 
}

export default Container;