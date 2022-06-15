import React from 'react';
import * as Styles from '@material-ui/core';

class ShowModal extends React.Component {

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };

    render(){
       
        if(!this.props.show){
            return null;
        }

        return(
            <>
            
            <Styles.Dialog
                open={this.props.show}
                onClick={!this.props.backDrop ? '' : this.onClose }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                    <Styles.DialogContent style={{backgroundColor: '#343a40', borderRadius: '0px'}}>
                        <Styles.DialogContentText>
                            {this.props.children}
                        </Styles.DialogContentText>
                    </Styles.DialogContent>
                    {this.props.showClose ? 
                    
                    <Styles.DialogActions style={{backgroundColor: '#343a40'}}>
                        <Styles.Button onClick={this.onClose} color="primary">
                        dismiss
                    </Styles.Button>
                    
                    </Styles.DialogActions>
                    
                    : ''}
                    
            </Styles.Dialog>
            </>
        );
    }
}

export default ShowModal;