import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';

import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    city: "",
  });
  const [allData, setAllData] = useState([]);
  const [citesList, setCitesList] = useState([]);
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    // Fetch countries and cities from the API
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries")
      .then((res) => {
        setAllData(res.data.data);
        getCountryFunction(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const getCountryFunction = (data) => {
    const countryOptions =
      data &&
      data.length > 0 &&
      data.map((item) => ({
        value: item.country,
        label: item.country,
        cities: item.cities,
      }));
    setCountryList(countryOptions);
  };

  const handleCountryChange = (selectedOption) => {
    setForm((prevForm) => ({
      ...prevForm,
      country: selectedOption ? selectedOption.value : "",
      city: "", // Reset city when country changes
    }));

    if (selectedOption) {
      setCitesList(selectedOption.cities);
    } else {
      setCitesList([]);
    }
  };

  const handleCityChange = (selectedOption) => {
    setForm((prevForm) => ({
      ...prevForm,
      city: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form, "form");
    localStorage.setItem('formData', JSON.stringify(form));
    navigate("/form")
  };
  const filterOption = (option, rawInput) => {
    // Case-insensitive matching that only displays options that start with the input value entered by user
    return option.label.toLowerCase().startsWith(rawInput.toLowerCase());
  };

  return (
    <div className="container mx-auto mt-12 p-4 md:p-8 bg-white shadow-lg rounded-lg border border-gray-200 max-w-lg">
    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Country and City Form</h2>
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="form-group mb-4">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => handleChange(e)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address:</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => handleChange(e)}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="country" className="block text-gray-700 font-medium mb-2">Country:</label>
        <Select
          id="country"
          name="country"
          options={countryList}
          onChange={handleCountryChange}
          placeholder="Select or type a country"
          isClearable
          isSearchable
          filterOption={filterOption}
          
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="city" className="block text-gray-700 font-medium mb-2">City:</label>
        <Select
          id="city"
          name="city"
          options={citesList.map(city => ({ value: city, label: city }))}
          onChange={handleCityChange}
          placeholder="Select or type a city"
          isClearable
          isSearchable
          filterOption={filterOption}
          isDisabled={citesList.length === 0}
          
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      >
        Submit
      </button>
    </form>
    
  </div>
  );
};

export default Form;
