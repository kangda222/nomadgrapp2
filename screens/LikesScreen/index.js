import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as photoActions } from "../../redux/modules/photos";

const mapStateToProps = (state, ownProps) => {
    //console.log(state);
    const { photos: { feed: { likes } } } = state;
    return { likes };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      getLikes: (photoId) => {
        dispatch(photoActions.getLikes(photoId));
      }
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Container);