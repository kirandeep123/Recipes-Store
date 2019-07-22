import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProTip from './ProTip';
import TitlebarGridList from './List';
function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      recipes:{ "items":[]}
    }
    this.detailedView = this.detailedView.bind(this);
    this.createDta = this.createDta.bind(this);
  }


  createDta(){
    var filterd ;

    let newProps = this.state.recipes.items.map(item => {


    
      if(item.sys.contentType.sys.id ==='chef' ){
       // console.log("entering",item.fields.name)
          item.chefName = item.fields.name;
      }
      else if (item.sys.contentType.sys.id==='tag' && item.fields.name){
        item.tag =item.fields.name;
      }

    // (item.chefName)? console.log("after if else " ,item.chefName) :console.log("nothing")

    console.log(item);
      let filterdPhotoId = this.state.recipes.includes.Asset.filter(asset => {
        let photoID = ((((item || {}).fields || {}).photo || {}).sys || {}).id;
        return photoID === asset.sys.id;
      })


      if (filterdPhotoId.length) {
        item.imageURL = filterdPhotoId[0].fields.file.url
      } else {
        item.imageURL = 'https://source.unsplash.com/random'
      }

      })
  }
  detailedView(e){
    console.log("Detailed View" , e)


  }
  componentDidMount(){
  //  console.log("component did mount");
    fetch('https://cdn.contentful.com/spaces/kk2bw5ojx476/entries?access_token=7ac531648a1b5e1dab6c18b0979f822a5aad0fe5f1109829b8a197eb2be4b84c')
    .then(resp =>resp.json())
    .then(results =>{
    //  console.log(results.items.map( item => console.log(item.sys.id)))
      //console.log(results.includes.Asset.map( item =>console.log(item.sys.id))," checking ")
          this.setState({recipes:results})
    })  
  }

  getId(){
    let src=[];
  }
  render(){
    return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create React App v4-beta example
          </Typography>
          <ProTip />
          <MadeWithLove />
        
        </Box>
        <TitlebarGridList recipes ={this.state.recipes} detailedView ={this.detailedView} createDta ={this.createDta}/>
      </Container>
    );
  }
  
}

export default App;