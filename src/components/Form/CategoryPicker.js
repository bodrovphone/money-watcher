// +core+
import React, { Component, Fragment } from 'react';

// @markup
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import defaultSetOfIcons from '../../constants/defaultIconsSet';
import ActionAndroid from 'material-ui/svg-icons/action/android';

// creating buttons with labels of categories
class Categories extends Component {
    ListCategories() {
      // transforming data from obj to array
      const categories = Object.values(this.props.categories);
      // creating list of Buttons with labels (TBD : add handleClose events to update parent state - add transaction to it)
      const list = categories.map((cat, index) => (
              <FlatButton
                key={ index }
                label={ cat.en }
                primary={ true }
                keyboardFocused={ true }
                onClick={ () => this.props.handleClose(cat.en) }
                icon={ defaultSetOfIcons(cat.en) || <ActionAndroid /> }
              />)           
              );
      return list;
    }

    render() {
      return(
        <div className="cPickerDialog">
          { 
            this.ListCategories()
          }
          </div>
        )
    }
}

export default class CategoryPicker extends Component {
    render() {
        const { noCategoryAlert, chosenCategory, handleOpen, handleClose, isCatPickerOpen, categories } = this.props;
        return (
          <Fragment>
              <br/>
              <RaisedButton
                className={ noCategoryAlert ? "categoryPicker noCategoryAlert" :"categoryPicker" }
                label={ chosenCategory || 'pick a category' } 
                labelPosition="after"
                icon={ defaultSetOfIcons(chosenCategory) }
                onClick={ handleOpen } 
                fullWidth={ true }
                backgroundColor="rgb(163, 188, 79)"
              />
              <br/>
                <Dialog
                  modal={ false }
                  open={ isCatPickerOpen }
                  onRequestClose={ handleClose }
                  autoScrollBodyContent={ true }
                >
                  <Tabs>
                      <Tab icon={ defaultSetOfIcons("Expense") } label="Expense" >
                        <Categories {...this.props} categories={ categories.expense } />
                      </Tab>
                      <Tab icon={ defaultSetOfIcons("Income") } label="Income">
                        <Categories {...this.props} categories={ categories.income } />
                      </Tab>
                  </Tabs>
                </Dialog>
          </Fragment>
        )}
  }