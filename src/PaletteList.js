import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { Link } from 'react-router-dom';
import styles from './styles/PaletteListStyles'
import { withStyles } from '@material-ui/styles';

class PaletteList extends Component {
    goToPalette (id) {
        this.props.history.push(`/palette/${id}`)
    }
    render () {
        const { palettes, classes, deletePalette } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <div className={classes.nav}>
                        <h1 className={classes.heading}>React Colors</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </div>
                    <div className={classes.palettes}>
                        {palettes.map(palette => (
                            <MiniPalette
                                {...palette}
                                handleDelete={deletePalette}
                                handleClick={() => this.goToPalette(palette.id)}
                                key={palette.id}
                                id={palette.id}
                            />
                        ))}
                    </div>
                </div>

            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);