import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { SortableElement } from 'react-sortable-hoc';
import { withStyles } from '@material-ui/styles';
import styles from './styles/DraggableColorBoxStyles.js'

const DraggableColorBox = SortableElement((props) => {
    const { classes, color, name, handleDelete } = props;
    return (
        <div
            className={classes.root}
            style={{ backgroundColor: color }}
        >
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon className={classes.deleteIcon} onClick={handleDelete} />
            </div>

        </div>
    )
})

export default withStyles(styles)(DraggableColorBox);