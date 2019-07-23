import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import TitlebarGridList from './List';
import * as contentful from 'contentful';

function MadeWithLove() {
  return (
    <Typography variant="h4" color="textSecondary" align="center">
      { 'Built with love by Kirandeep Kaur' }
    </Typography>
  );
}

/**
 * Grid View
 * Title
 * Image
 * 
 * Detailed View
 * Title
 * Image
 * Tags
 * Chef Name
 * Description
 */

class App extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      recipes:[],
    }
    this.detailedView = this.detailedView.bind(this);
    this.client = contentful.createClient({
      space: "kk2bw5ojx476",
      accessToken: "7ac531648a1b5e1dab6c18b0979f822a5aad0fe5f1109829b8a197eb2be4b84c"
    });
  }

  detailedView(e){
    console.log("Detailed View" , e)
  }

  async componentDidMount(){
    let recipes = [];
    let entries = await this.client.getEntries();

    // This is for receied
    entries.items.forEach(entry => {
      if (entry.fields.title) {
        let imageAsset = entries.includes.Asset.filter(a => a.sys.id === entry.fields.photo.sys.id).pop()
        recipes.push({ title: entry.fields.title, imageURL: imageAsset.fields.file.url, desc:entry.fields.description })
      }

 // console.log(entry.sys.contentType.sys.id,'----', entry.fields.name || entry.fields.title,' recipe tags id ---',  entry.fields  )
      if (entry.fields.chef) {
      //  console.log("i am into this chef ")
        let chef = entries.items.filter(a => a.sys.id === entry.fields.chef.sys.id).pop()
           recipes.push({chefname:chef.fields.name})
     }
//console.log(entry.fields.tags.sys ,"tags")
    //  if(entry.fields.tags){
    //   let tags = entries.items.filter(a => a.sys.id === entry.fields.tags.sys.id).pop()
    //   recipes.push({tagList:tags.fields.name})
    //  }

    // entries.items.map( entry =>{
    //   this.client.getEntries({
    //     content_type: 'tag',
    //     'sys.id': entry.sys.id
    //   })
    //   .then((response) => console.log(response.items))
    //   .catch(console.error)
    // })
   
    this.client.getEntries({
      links_to_asset: '<asset_id>'
    })
    .then((response) => console.log(response.items))
    .catch(console.error)


    
    // if(entry.fields.chef){
    //   console.log(entry.fields.chef.sys.id)
    // }

      // if(entry.sys.contentType.sys.id ==='chef'  ){
      //   let imageAsset = entries.includes.Asset.filter(a => a.sys.id === entry.fields.photo.sys.id).pop()

      //   // console.log("entering",item.fields.name)
      //      recipes.push({chefName:entry.fields.name})
      //  }
      //  else if (entry.sys.contentType.sys.id==='tag' ){
      //    recipes.push({tags:entry.fields.name})
      //  }
 
     // (item.chefName)? console.log("after if else " ,item.chefName) :console.log("nothing")
 
    })

    this.setState({ recipes })
  // console.log({recipes})
  }

  render(){
    return (
      <Container maxWidth="lg">
        <Box my={4}>
          <Typography variant="h1" component="h1" gutterBottom>
            Marley Spoon Recipes Store       
               </Typography>
          <MadeWithLove />
        </Box>
        <TitlebarGridList recipes ={this.state.recipes} detailedView ={this.detailedView} />
      </Container>
    );
  }
  
}

export default App;
