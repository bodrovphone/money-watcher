// +core+
import React from 'react';

// @markup
import Dialog from 'material-ui/Dialog';
import Form from '../Form'

export default props => (
            <Dialog
                title="You wanna change this expense?"
                modal={false}
                open={props.open}
                onRequestClose={props.handleClose}
            >
                <Form 
                    {...props}
                    editing={true}
                    handleClose={props.handleClose}
                 />
            </Dialog>
        )