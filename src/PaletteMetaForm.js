import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 'form',
            newPaletteName: ''
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.savePalette = this.savePalette.bind(this);
    };
    componentDidMount () {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }
    handleChange (evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    };
    showEmojiPicker () {
        this.setState({ stage: 'emoji' })
    }
    handleClickOpen () {
        this.setState({ open: true });
    };

    handleClose () {
        this.setState({ open: false });
    };
    savePalette (emoji) {
        const newPalette = { paletteName: this.state.newPaletteName, emoji: emoji.native }
        this.props.handleSubmit(newPalette)
    }
    render () {
        const { hideForm } = this.props;
        const { newPaletteName, stage } = this.state;
        return (
            <div>
                <Dialog open={stage === 'emoji'} onClose={hideForm}>
                    <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
                    <Picker
                        onSelect={this.savePalette}
                        title='Pick A Patlette Emoji'

                    />
                </Dialog>
                <Dialog
                    open={stage === 'form'}
                    onClose={hideForm}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name for your new beautiful palette. Make sure it's unique!
                            </DialogContentText>
                            <TextValidator
                                value={newPaletteName}
                                label='Palette Name'
                                fullWidth
                                name='newPaletteName'
                                margin='normal'
                                onChange={this.handleChange}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['Please enter a palette name.', 'Name already used!']}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={hideForm} color="primary">
                                Cancel
                            </Button>
                            <Button
                                variant='contained'
                                color='primary'
                                type='submit'
                            >
                                Save Palette
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>

        )
    }
}

export default PaletteMetaForm;