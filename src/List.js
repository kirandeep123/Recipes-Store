import React, {useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import ListDetailDialogue from './listDetail';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function TitlebarGridList(props) {
  const classes = useStyles();
  const [showDetailView, setShowDetailView] = React.useState(false);
  //console.log(props.recipes[0].title,   "title showing")
  function handleSetShowDetailView(keydata) {
    setShowDetailView(true)
  }

  // Declare, whatever data in model. Pass that data to ListDetailDialogue as props
  // Show that in model, Key as title may be unique.

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
        </GridListTile>
        { showDetailView ? 
            <ListDetailDialogue   detailedData ={props.recipes} open={true} /> : '' }
        {  props.recipes.map(tile => (
          tile.title ?
          <GridListTile key={tile.title}>
            <img src={tile.imageURL} alt={tile.imageURL} />
            <GridListTileBar
              title={tile.title}
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon} onClick ={handleSetShowDetailView}>
                  <InfoIcon/>
                </IconButton>
              }
            />
    ))}
          </GridListTile> :''
        ))}
      </GridList>
    </div>
  );
}