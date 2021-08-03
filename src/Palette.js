import React, { Component } from 'react';
import ColorBox from './ColorBox';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteStyles'
import Navbar from './Navbar'

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500, format: 'hex' };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }
    changeLevel (level) {
        this.setState({ level })
    }
    changeFormat (val) {
        this.setState({ format: val });
    }
    render () {
        const { colors, paletteName, emoji, id } = this.props.palette;
        const { classes } = this.props;
        const { level, format } = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox
                background={color[format]}
                name={color.name}
                key={color.id}
                moreUrl={`/palette/${id}/${color.id}`}
                showingFullPalette
            />
        ))
        return (
            <div className={classes.palette}>
                <Navbar
                    handleChange={this.changeFormat}
                    level={level}
                    changeLevel={this.changeLevel}
                    showingAllColors
                />
                <div className={classes.colors}>{colorBoxes}</div>
                <footer className={classes.footer}>
                    {paletteName}
                    <span className='emoji'>{emoji}</span>
                </footer>
            </div>
        )
    }
}


export default withStyles(styles)(Palette);