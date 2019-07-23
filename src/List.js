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
    height: 650,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function TitlebarGridList(props) {
  const classes = useStyles();
  const [recipeData, setRecipeDetailView] = React.useState(false);
  //  handling dialog box/detailed view functionality
  function handleSetRecipeDetailView(recipeData) {
    setRecipeDetailView(recipeData)
  }

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
        </GridListTile>
        { recipeData ? 
            <ListDetailDialogue key={recipeData.title} recipeData ={recipeData} open={true} /> : '' }
        {  props.recipes.map(recipeData => (
          recipeData.title ?
          <GridListTile key={recipeData.title}>
            <img src={recipeData.imageURL} alt={recipeData.imageURL} />
            <GridListTileBar
              title={recipeData.title}
              actionIcon={
                <IconButton aria-label={`info about ${recipeData.title}`} className={classes.icon} onClick ={() => handleSetRecipeDetailView(recipeData)}>
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