import React, { Component } from 'react';
import Property from './Property.js';
import Grid from '@material-ui/core/Grid';


class PropertiesList extends Component {

  render(){
    const properties = this.props.properties.map(currentProperty => {
      return (
        <Grid item xs={16} sm={6} lg={4} xl={3}>
          <Property property={currentProperty} />
        </Grid>
        )
      })

      return (
        <Grid container spacing={16}    style={{padding:16}}>
         {properties}
        </Grid>
      )

  }

}

// const PropertiesList = (props) => {
//
//   const properties = props.properties.map(property => {
//     return (
//       <div key={property.id} className="property-list">
//         <Property property={property} />
//       </div>
//     )
//   })
//
//   return (
//     <ul>
//       {properties}
//     </ul>
//   )
//
// }


export default PropertiesList;
