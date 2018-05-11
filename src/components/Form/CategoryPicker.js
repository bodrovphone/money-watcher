// +core+
import React, { Component, Fragment } from 'react';

// @markup
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import Tune from 'material-ui/svg-icons/image/tune';
import ActionAndroid from 'material-ui/svg-icons/action/android';

// creating buttons with labels of expenses categories
class Categories extends Component {
  
  ListCateglories() {
    // transforming data from obj to array
    const categories = [];
    for (let item in this.props.categories) {
        categories.push(this.props.categories[item]);
    }
    // creating a list of icon names
    var myIcon = {};
    var myString = "ActionAndroid"
    myIcon.Tune = <Tune />
    myIcon.ActionAndroid = <ActionAndroid />

    // creating list of Buttons with labels (TBD : add handleClose events to update parent state - add transaction to it)
    const list = categories.map((cat, index) => (
            <FlatButton
              key={index}
              label={cat.en}
              primary={ true }
              keyboardFocused={ true }
              onClick={ () => this.props.handleClose(cat.en) }
              icon={myIcon[cat.icon] || myIcon[myString]}
            />)           
            );

    return list;
  }


  render() {
    return(
      <div className="categoryPicker-dialog">
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
          <RaisedButton
            className="categoryPicker"
            label={this.props.chosenCategory || 'pick a category'} 
            labelPosition="after"
            icon={<Tune />}
            onClick={ this.props.handleOpen } 
            fullWidth={true}
            backgroundColor="rgb(163, 188, 79)"
          />
          <br/>
            <Dialog
              modal={ false }
              open={ this.props.isCatPickerOpen }
              onRequestClose={ this.props.handleClose }
              autoScrollBodyContent={ true }
            >
              <Tabs>
                  <Tab icon={<FontIcon className="material-icons">Expense</FontIcon>} >
                    <Categories {...this.props} categories={this.props.categories.expense} />
                  </Tab>
                  <Tab icon={<FontIcon className="material-icons">Income</FontIcon>} >
                    <Categories {...this.props} categories={this.props.categories.income} />
                  </Tab>
              </Tabs>
            </Dialog>
      </Fragment>
      )}
  }