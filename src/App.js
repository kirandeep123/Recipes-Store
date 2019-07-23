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

class App extends React.Component {
  constructor(props){
    super(props)

    this.state ={
      recipes:[],
    }
    //setting up client
    this.client = contentful.createClient({
      space: "kk2bw5ojx476",
      accessToken: "7ac531648a1b5e1dab6c18b0979f822a5aad0fe5f1109829b8a197eb2be4b84c"
    });
  }

  async componentDidMount(){
    let recipes = [];
    let entries = await this.client.getEntries();

    for(let entry of entries.items) {
      
        if (entry.fields.title) {
        
        const imageAsset = await this.client.getAsset(entry.fields.photo.sys.id);
        const chef = entry.fields.chef ?  await this.client.getEntry(entry.fields.chef.sys.id): null;
        const tags = entry.fields.tags ? entry.fields.tags.map(tag => tag.fields.name) : [];
            
        recipes.push({
          title: entry.fields.title,
          imageURL: imageAsset.fields.file.url,
          desc: entry.fields.description,
          chefName: chef!=null?chef.fields.name:'',
          tags :tags.join(', ')
        })
      }
    }
    //setting state
    this.setState({ recipes })
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
        <TitlebarGridList recipes ={this.state.recipes}  />
      </Container>
    );
  }
  
}

export default App;
