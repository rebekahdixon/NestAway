import React from 'react';
import Property from './Property.js';


const FilteredPropertyList = (props) => {
  console.log(props);

  const properties = props.filteredProperties.map(property => {
    return (
      <li key={property.id} className="component-item">
        <Property property={property} />
      </li>
    )
  })

	return (
		<ul>
		 	{properties}
		</ul>
	)

}

export default FilteredPropertyList;