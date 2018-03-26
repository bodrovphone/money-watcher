// +core+
import React, { Fragment } from 'react';

// @markup
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';



function CategoryPicker(state, handleClose, handleOpen) {
    const categories = [
      <FlatButton
        label="Cancel"
        primary={ true }
        onClick={ handleClose }
      />,
      <FlatButton
        label="Submit"
        primary={ true }
        keyboardFocused={ true }
        onClick={ handleClose }
      />,
      <IconButton>
      <ActionHome />
    </IconButton>
    ];

    return (

      <Fragment>
          <br/>
        <RaisedButton label="Dialog" onClick={ handleOpen } />
          <br/>
            <Dialog
              title="Dialog With Actions"
              actions={ categories }
              modal={ false }
              open={ state.isCatPickerOpen }
              onRequestClose={ handleClose }
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
                      onClick={ handleClose }
                    />
                  </Tab>
                  <Tab
                    icon={<FontIcon className="material-icons">favorite</FontIcon>}
                    label="FAVORITES"
                  >
                    <FlatButton
                      label="Cancel"
                      primary={ true }
                      onClick={ handleClose }
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

      )
  }

export default CategoryPicker;