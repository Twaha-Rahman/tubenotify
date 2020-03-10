import * as React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../utilities/mapStateToProp';
import './Selector.css';
import Button from '../../components/Button/Button';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import InfoToggler from '../../components/InfoToggler/InfoToggler';
import eraseAll from '../../utilities/eraseAll';
import { Redirect } from 'react-router';
import multipleStoreCommits from '../../utilities/multipleStoreCommits';
import looper from '../../utilities/looper';
import compareAndKeep from '../../utilities/compareAndKeep';

import Loading from 'src/components/Loading/Loading';

class Selector extends React.Component<any> {
  constructor(props: any) {
    super(props); // store and route is in the props
    this.helper = this.helper.bind(this);
  }
  public componentWillUnmount() {
    this.props.dispatch({
      type: `clearStep`
    });
    this.props.dispatch({
      type: `hideLoader`
    });
    this.props.dispatch({
      type: 'eraseCurrentlySelected'
    });
    eraseAll(this, 'selector');
  }

  public helper(e: any) {
    const num = Number(e.target.id);
    const numberOfCards = this.props.store.addTitles.length;
    const selectedCount = numberOfCards - num;
    console.log(selectedCount);
    this.props.dispatch({
      type: `currentlySelected`,
      number: selectedCount
    });
  }

  public render() {
    const { addTitles, addThumbnailLinks, currentlySelected } = this.props.store;
    const unselected: number = addTitles.length - currentlySelected - 1;
    const renderThis = addTitles.map((val: string, index: number) => {
      if (unselected > index || unselected === index) {
        return (
          <div
            key={index}
            onClick={e => {
              this.helper(e);
            }}
          >
            <InfoToggler
              textColor="#bdc3c7"
              backgroundColor="#34495e"
              num={index}
              title={val}
              imgLink={addThumbnailLinks[index]}
            />
          </div>
        );
      }
      return (
        <div
          key={index}
          onClick={e => {
            this.helper(e);
          }}
        >
          <InfoToggler
            textColor="#0c212f"
            backgroundColor="#27ae60"
            num={index}
            title={val}
            imgLink={addThumbnailLinks[index]}
          />
        </div>
      );
    });

    if (this.props.store.stepCounter === 4) {
      return <Loading />;
    }

    if (this.props.store.stepCounter === 5) {
      // process the data here and go to the next page by rendering the following line-
      // titles, descriptions, thumbnailLinks, keywords, channelName, channelLogoLink, channelTag, playlistID, lookedUpToThisVideoTag

      return <Redirect to="/final" />;
    }

    return (
      <div className="selector-container">
        <div>
          <h1 className="header-container">Select the video you have watched recently :</h1>
        </div>
        {renderThis}
        <div className="selector-btn-container">
          <span
            className="selector-next-btn"
            onClick={() => {
              this.props.dispatch({
                type: `stepInc`
              });
            }}
          >
            <Button expadedButton={true} buttonMessage="Next" buttonIcon={faArrowRight} />
          </span>
          <span
            className="selector-load-more-btn"
            onClick={async () => {
              console.log(this.props.store.requestLink);
              const newLink: string = `${this.props.store.requestLink.link}pageToken=${
                this.props.store.requestLink.nextPageToken
              }`;
              console.log(newLink);

              const secondLinkData = await (await fetch(newLink)).json();
              const lookedUpToThisVideoTag =
                secondLinkData.items[secondLinkData.items.length - 1].snippet.resourceId.videoId;

              const descriptions: string[] = [];
              const thumbnailLinks: string[] = [];
              const titles: string[] = [];

              const videoInfoArray = secondLinkData.items;
              videoInfoArray.forEach((response: any) => {
                titles.push(response.snippet.title);
                descriptions.push(response.snippet.description);
                thumbnailLinks.push(response.snippet.thumbnails.medium.url);
              });

              ///////////
              const keywords = this.props.store.addKeyword;
              const matchedTitlesIndex = looper(titles, keywords);
              const matchedDescriptionsIndex = looper(descriptions, keywords);
              const uniqueMatchedTitlesIndex = [...new Set(matchedTitlesIndex)];
              const uniqueMatchedDescriptionsIndex = [...new Set(matchedDescriptionsIndex)];
              const combinedUniqueIndexes = [
                ...new Set([...uniqueMatchedTitlesIndex, ...uniqueMatchedDescriptionsIndex])
              ];

              const keepTheseTitles: string[] = compareAndKeep({
                source: titles,
                toCompareWith: combinedUniqueIndexes
              });
              const keepTheseDescriptions: string[] = compareAndKeep({
                source: descriptions,
                toCompareWith: combinedUniqueIndexes
              });
              const keepTheseThumbnailLinks: string[] = compareAndKeep({
                source: thumbnailLinks,
                toCompareWith: combinedUniqueIndexes
              });

              this.props.dispatch({
                type: 'updateAdditionalInfo',
                action: {
                  lookedUpToThisVideoTag: lookedUpToThisVideoTag
                }
              });

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
                type: 'requestLink',
                link: this.props.store.requestLink.link,
                nextPageToken: secondLinkData.nextPageToken
              });
            }}
          >
            <Button expadedButton={true} buttonMessage="Load More" buttonIcon={faArrowRight} />
          </span>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Selector);
