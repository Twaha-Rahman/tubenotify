function eraseAll(refToThis: any, scene: string) {
  refToThis.props.dispatch({
    type: `eraseTitles`
  });

  refToThis.props.dispatch({
    type: `eraseDescriptions`
  });

  refToThis.props.dispatch({
    type: `eraseThumbnailLinks`
  });
  if (scene === 'selector') {
    refToThis.props.dispatch({
      type: 'eraseAdditionalInfo'
    });
    refToThis.props.dispatch({
      type: 'eraseRequestLink'
    });
    refToThis.props.dispatch({
      type: 'eraseKeywords'
    });
  }
}

export default eraseAll;
