import React, { Component } from 'react';
import Request from '../helpers/Request.js'
import FilteredPropertiesList from '../components/FilteredPropertiesList.js';
import CustomerSelector from './CustomerSelector.js';



class BookingForm extends Component {
  constructor(props){
    super(props);
    this.handleCriteriaSubmit = this.handleCriteriaSubmit.bind(this);
    this.handleCustomerSelect = this.handleCustomerSelect.bind(this);
    this.handlePropertySelect = this.handlePropertySelect.bind(this);
    // this.handleBooking = this.handleBooking.bind(this);
    this.handleBookingPost = this.handleBookingPost.bind(this)
  }

  handleCriteriaSubmit(event){
    event.preventDefault()
    const criteria = {
      "startDate": event.target.startDate.value,
      "endDate": event.target.endDate.value,
      "capacity": event.target.capacity.value,
      "maxPricePerNight": event.target.maxPricePerNight.value
    }
    this.props.onCriteriaSubmit(criteria);
    console.log(criteria);
  }

  handleCustomerSelect(index){
    this.props.setSelectedCustomer(index);
  }

  handlePropertySelect(propertyId){
    this.props.setSelectedProperty(propertyId);
    document.getElementById('booking-form-submit').style.visibility = 'visible';
    console.log(this.props.bookingCriteria.startDate);
    console.log(this.props.bookingCriteria.endDate);
  }


  // handleBooking(){
  //   console.log(this.props);
  //   this.props.handleBookingPost();
  // }

  handleBookingPost(event){
    event.preventDefault();
    console.log(this.props);

    // const startDate = new Date(this.props.bookingCriteria.startDate).getTime() / 1000;
    // const endDate = new Date(this.props.bookingCriteria.endDate).getTime() / 1000;

    const startDateArray = this.props.bookingCriteria.startDate.split("-");
    const reformattedStartDate = startDateArray[2] + "-" + startDateArray[1] + "-" + startDateArray[0];

    const endDateArray = this.props.bookingCriteria.endDate.split("-");
    const reformattedEndDate = endDateArray[2] + "-" + endDateArray[1] + "-" + endDateArray[0];


    const confirmedBooking = {
      "customer": `http://localhost:8080/api/customers/${this.props.selectedCustomer}`,
      "property": `http://localhost:8080/api/properties/${this.props.selectedProperty}`,
      "totalPrice": 50,
      "startDate": `${reformattedStartDate}`,
      "endDate": `${reformattedEndDate}`

    }
    const request = new Request();
    request.post('/api/bookings', confirmedBooking).then(() => {
      window.location = '/bookings'
    })
  }


  render() {
    return (

      <div className="form-container">

      <form onSubmit={this.handleCriteriaSubmit}>

        <CustomerSelector
          customers={this.props.existingCustomers}
          handleCustomerSelect={this.handleCustomerSelect}
        />
        <label for="startDate">Check-in Date</label>
        <input type="date" placeholder="Check-in" name="startDate" required/>

        <label for="endDate">Check-out Date</label>
        <input type="date" placeholder="Check-out" name="endDate" required/>

        <label for="capacity">Number of Beds</label>
        <input type="text" placeholder="Capacity" name="capacity" required/>

        <label for="maxPricePerNight">Maximum Price Per Night</label>
        <input type="number" placeholder="Max price per night" name="maxPricePerNight" required/>

        <button id="booking-form-filter-button" type="submit">Display available nests</button>
      </form>

      <div className="margin"/>


      <FilteredPropertiesList
        filteredProperties={this.props.filteredProperties}
        handlePropertySelect={this.handlePropertySelect}
        handleBookingClick={this.handleBooking}
      />

      <form id="booking-form-submit" onSubmit={this.handleBookingPost}>
        <button id="booking-form-submit-button" type="submit">Confirm booking</button>
      </form>

      </div>
    )
  }

}

export default BookingForm;
