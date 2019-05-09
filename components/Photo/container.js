import React, { Component } from "react";
import PropTypes from "prop-types";
import Photo from "./presenter";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: props.is_liked,
      likeCount: props.like_counts
    };
  }

  static propTypes = {
    dispatchLike: PropTypes.func.isRequired,
    dispatchGetLikes: PropTypes.func.isRequired
  };

  render() {
      //console.log(this.props);
      return (
        <Photo handlePress={this._handlePress} {...this.props} {...this.state} getLikes={this._getLikes} />
      );
  }

  _handlePress = () => {
    const { dispatchLike } = this.props;
    const { isLiked } = this.state;
    dispatchLike(isLiked);
    if (isLiked) {
      this.setState(prevState => {
        return {
          isLiked: false,
          likeCount: prevState.likeCount - 1
        };
      });
    } else {
      this.setState(prevState => {
        return {
          isLiked: true,
          likeCount: prevState.likeCount + 1
        };
      });
    }
  };

  _getLikes = async(photoId) => {
    const { dispatchGetLikes } = this.props;
    //console.log(`photoId :: ${photoId}`);    
    const Likes = await dispatchGetLikes(photoId);
    //console.log("Likes :: ");
    //console.log(Likes);
    return Likes;    
  };
}

export default Container;