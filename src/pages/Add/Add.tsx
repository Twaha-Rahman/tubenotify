import * as React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../utilities/mapStateToProp';
import AddBody from '../../components/AddBody/AddBody';
import linkGenerator from '../../utilities/linkGenerator';
import eraseAll from '../../utilities/eraseAll';
import Loading from '../../components/Loading/Loading';
import { Redirect } from 'react-router';
import looper from '../../utilities/looper';
import compareAndKeep from '../../utilities/compareAndKeep';
import multipleStoreCommits from '../../utilities/multipleStoreCommits';

class Add extends React.Component<any> {
  constructor(props: any) {
    super(props); // store and route is in the props
    console.log(this);
    this.submitter = this.submitter.bind(this);
    this.props.dispatch({
      type: `stepInc`
    });
  }

  public componentWillUnmount() {
    if (this.props.store.stepCounter !== 3) {
      this.props.dispatch({
        type: `clearStep`
      });
      this.props.dispatch({
        type: `hideLoader`
      });
      eraseAll(this);
    }
  }

  public submitter = () => {
    const inputRef = document.getElementById(`input`) as HTMLInputElement;

    const currentStep = this.props.store.stepCounter;
    const inputData = inputRef.value;

    if (currentStep === 1) {
      if (inputRef.value !== ``) {
        const inputLinkParts = inputData.split(`/`);
        const ytId = inputLinkParts[inputLinkParts.length - 1];

        const firstLink = linkGenerator({ id: ytId, type: `channels`, part: `contentDetails` });
        this.props.dispatch({
          type: `showLoader`
        });
        fetch(firstLink)
          .then(firstLinkResponse => {
            firstLinkResponse.json().then(firstLinkData => {
              if (firstLinkData.items.length === 0) {
                this.props.dispatch({
                  type: `showError`
                });
              } else {
                const playlistId: string = firstLinkData.items[0].contentDetails.relatedPlaylists.uploads;
                const secondLink = linkGenerator({
                  playlistId,
                  type: `playlistItems`,
                  maxResults: 50,
                  part: `snippet`
                });

                fetch(secondLink)
                  .then(secondLinkResponse => {
                    secondLinkResponse.json().then(secondLinkData => {
                      const videoInfoArray = secondLinkData.items;
                      const descriptions: string[] = [];
                      const thumbnailLinks: string[] = [];
                      const titles: string[] = [];
                      videoInfoArray.forEach((abc: any) => {
                        titles.push(abc.snippet.title);
                        descriptions.push(abc.snippet.description);
                        thumbnailLinks.push(abc.snippet.thumbnails.medium.url);
                      });
                      multipleStoreCommits({
                        refToDispatcher: this.props.dispatch,
                        commitName: `Title`,
                        arrayToCommit: titles
                      });

                      multipleStoreCommits({
                        refToDispatcher: this.props.dispatch,
                        commitName: `Description`,
                        arrayToCommit: descriptions
                      });

                      multipleStoreCommits({
                        refToDispatcher: this.props.dispatch,
                        commitName: `ThumbnailLink`,
                        arrayToCommit: thumbnailLinks
                      });
                      this.props.dispatch({
                        type: `stepInc`
                      });
                    });
                  })
                  .catch(why => {
                    this.props.dispatch({
                      type: `showError`
                    });
                  });
              }
            });
          })
          .catch(reason => {
            this.props.dispatch({
              type: `showError`
            });
          });
      } else {
        inputRef.style.borderBottomColor = `red`;
        inputRef.placeholder = `Please fill in this field`;
      }
    }
    if (currentStep === 2) {
      const subscriptionWords = inputData.split(`,`);
      const { addTitles, addDescriptions, addThumbnailLinks } = this.props.store;

      const indexByTitle = looper(addTitles, subscriptionWords);
      const indexByDescription = looper(addDescriptions, subscriptionWords);
      const uniqueIndexByTitle = [...new Set(indexByTitle)];
      const uniqueIndexByDescription = [...new Set(indexByDescription)];
      const combinedUniqueIndexes = [...new Set([...uniqueIndexByTitle, ...uniqueIndexByDescription])];
      const keepTheseTitles: string[] = compareAndKeep({
        source: addTitles,
        toCompareWith: combinedUniqueIndexes
      });
      const keepTheseDescriptions: string[] = compareAndKeep({
        source: addDescriptions,
        toCompareWith: combinedUniqueIndexes
      });
      const keepTheseThumbnailLinks: string[] = compareAndKeep({
        source: addThumbnailLinks,
        toCompareWith: combinedUniqueIndexes
      });

      eraseAll(this);

      multipleStoreCommits({
        refToDispatcher: this.props.dispatch,
        commitName: `Title`,
        arrayToCommit: keepTheseTitles
      });

      multipleStoreCommits({
        refToDispatcher: this.props.dispatch,
        commitName: `Description`,
        arrayToCommit: keepTheseDescriptions
      });

      multipleStoreCommits({
        refToDispatcher: this.props.dispatch,
        commitName: `ThumbnailLink`,
        arrayToCommit: keepTheseThumbnailLinks
      });

      this.props.dispatch({
        type: `stepInc`
      });
    }
  };

  public render() {
    let renderThis;
    if (this.props.store.showLoader) {
      renderThis = <Loading />;
    }
    if (!this.props.store.showLoader) {
      renderThis = (
        <AddBody
          refToThis={this}
          mainText="Paste your link down here :"
          inputFieldText="Type or paste your link here"
        />
      );
    }

    if (this.props.store.stepCounter === 2) {
      renderThis = (
        <AddBody refToThis={this} mainText="Type your key-word down here :" inputFieldText="Type your key-word here" />
      );
    }

    if (this.props.store.errorToggler) {
      renderThis = <Redirect to="/error" />;
    }

    if (this.props.store.stepCounter === 3) {
      renderThis = <Redirect to="/selector" />;
    }

    return renderThis;
  }
}

export default connect(mapStateToProps)(Add);
