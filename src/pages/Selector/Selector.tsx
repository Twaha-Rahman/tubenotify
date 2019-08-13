import * as React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../utilities/mapStateToProp';
import './Selector.css';
import Button from '../../components/Button/Button';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import InfoToggler from '../../components/InfoToggler/InfoToggler';
import eraseAll from '../../utilities/eraseAll';
import { Redirect } from 'react-router';

import Loading from 'src/components/Loading/Loading';

class Selector extends React.Component<any> {
  constructor(props: any) {
    super(props); // store and route is in the props
    this.helper = this.helper.bind(this);
    console.log(`run`);
  }
  public componentWillUnmount() {
    this.props.dispatch({
      type: `clearStep`
    });
    this.props.dispatch({
      type: `hideLoader`
    });
    eraseAll(this);
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
      return <Redirect to="/final" />;
    }

    return (
      <div className="selector-container">
        <div>
          <h1 className="header-container">Select the video you have watched recently :</h1>
        </div>
        {renderThis}
        <div className="selector-next-btn">
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
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Selector);
