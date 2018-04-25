// +core+
import React, { Component, Fragment } from 'react';

// @markup
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import ActionAndroid from 'material-ui/svg-icons/action/android';

// creating buttons with labels of expenses categories
class Categories extends Component {
  
  ListCateglories() {
    // copying categories from props
    const categories = this.props.categories;
    const catLabels = [];
    // fulfilling english labels(for now)
    for (let item in categories) {
        catLabels.push(categories[item].en);
    }
    // creating list of Buttons with labels (TBD : add handleClose events to update parent state - add transaction to it)
    const list = catLabels.map((cat, index) => (
            <FlatButton
              key={index}
              label={cat}
              primary={ true }
              keyboardFocused={ true }
              onClick={ () => this.props.handleClose(cat) }
              icon={<ActionAndroid />}
            />           
            ));

    return list;
  }


  render() {
    return(
      <div>
        { 
          this.ListCateglories()
        }
        </div>
      )
  }
}

export default class CategoryPicker extends Component {
  render() {
    return (
      <Fragment>
          <br/>
          <RaisedButton label={this.props.chosenCategory || 'pick a category'} onClick={ this.props.handleOpen } />
          <br/>
            <Dialog
              title="choose category"
              modal={ false }
              open={ this.props.isCatPickerOpen }
              onRequestClose={ this.props.handleClose }
              autoScrollBodyContent={ true }
            >
              <Tabs>
                  <Tab
                    icon={<FontIcon className="material-icons">Expense</FontIcon>}
                    label="RECENTS"
                    >
                    <Categories {...this.props} categories={this.props.categories.expense} />
                  </Tab>
                  <Tab
                    icon={<FontIcon className="material-icons">Income</FontIcon>}
                    label="FAVORITES"
                  >
                    <Categories {...this.props} categories={this.props.categories.income} />
                  </Tab>
              </Tabs>
            </Dialog>
      </Fragment>
      )}
  }