function eraseAll(refToThis: any) {
  refToThis.props.dispatch({
    type: `eraseTitles`
  });

  refToThis.props.dispatch({
    type: `eraseDescriptions`
  });

  refToThis.props.dispatch({
    type: `eraseThumbnailLinks`
  });
}

export default eraseAll;
