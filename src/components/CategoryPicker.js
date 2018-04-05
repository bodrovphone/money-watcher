// +core+
import React, { Component, Fragment } from 'react';

// @markup
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';



export default class CategoryPicker extends Component {

    render() {
      const categories = [
          <FlatButton
            label={this.props.categories[0]}
            primary={ true }
            onClick={ this.props.handleClose }
            icon={<ActionAndroid />}
          />,
          <FlatButton
            label={this.props.categories[1]}
            primary={ true }
            keyboardFocused={ true }
            onClick={ this.props.handleClose }
            icon={<ActionAndroid />}
          />,
          <IconButton>
          <ActionHome />
        </IconButton>
        ];

    return (
      <Fragment>
          <br/>
        <RaisedButton label="Dialog" onClick={ this.props.handleOpen } />
          <br/>
            <Dialog
              title="Dialog With Actions"
              actions={ categories }
              modal={ false }
              open={ this.props.isCatPickerOpen }
              onRequestClose={ this.props.handleClose }
              autoScrollBodyContent={ true }
            >
              <Tabs>
                  <Tab
                    icon={<FontIcon className="material-icons">phone</FontIcon>}
                    label="RECENTS"
                    >
                    <FlatButton
                      label="Submit"
                      primary={ true }
                      keyboardFocused={ true }
                      onClick={ this.props.handleClose }
                    />
                  </Tab>
                  <Tab
                    icon={<FontIcon className="material-icons">favorite</FontIcon>}
                    label="FAVORITES"
                  >
                    <FlatButton
                      label="Cancel"
                      primary={ true }
                      onClick={ this.props.handleClose }
                    />
                  </Tab>
                  <Tab
                    icon={<MapsPersonPin />}
                    label="NEARBY"
                  >
                      <IconButton>
                        <ActionHome />
                      </IconButton>
                  </Tab>
              </Tabs>
            </Dialog>
      </Fragment>

      )}
  }