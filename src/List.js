import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import tileData from './tileData';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function TitlebarGridList(props) {
  const classes = useStyles();
        props.createDta();
        // console.log(props.recipes.items,"props")
        // var filterd ;

        // let newProps = props.recipes.items.map(item => {
        //   let filterd = props.recipes.includes.Asset.filter(asset => {
        //     let photoID = ((((item || {}).fields || {}).photo || {}).sys || {}).id;
        //     return photoID === asset.sys.id;
        //   })
      
        //   if (filterd.length) {
        //     item.imageURL = filterd[0].fields.file.url
        //   } else {
        //     item.imageURL = 'https://source.unsplash.com/random'
        //   }
        // })
      
  return (
    
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
        </GridListTile>
        {  props.recipes.items.map(tile => (
          tile.fields.title?
          <GridListTile key={tile.fields.title}>
          <img src={tile.imageURL} alt={tile.fields.title} />
    
            <GridListTileBar
              title={tile.fields.title ||tile.fields.name}
              subtitle={<span>by: { JSON.stringify(tile)}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${tile.fields.title}`} className={classes.icon} onClick ={ ()=>{props.detailedView()}}>
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