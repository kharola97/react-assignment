import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const UserForm = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState(null);
  const [cityPopulation, setCityPopulation] = useState(null);

  useEffect(() => {
    // Retrieve form data from localStorage
    const data = JSON.parse(localStorage.getItem('formData'));
    if (data) {
      setFormData(data);
      fetchCityPopulation(data.city);
    }
  }, []);

  const fetchCityPopulation = async (city) => {
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/population/cities');
      const data = await response.json();
      console.log(data.data,"popu")
      // Find the population data for the selected city
      const cityInfo = data.data.find(item => item.city.toLowerCase() === city.toLowerCase());
      setCityPopulation(cityInfo ? cityInfo.populationCounts[0].value : 'Not available');
    } catch (error) {
      console.error('Error fetching city population:', error);
      setCityPopulation('Error fetching population');
    }
  };

  if (!formData) {
    return (
        <div className="container mx-auto p-4 md:p-8 bg-white shadow-lg rounded-lg border border-gray-200 max-w-lg mt-4">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  const handleForm = ()=>{
    localStorage.clear();
    navigate("/")
  }

  return (
    <div className="container mx-auto p-6 md:p-10 bg-white shadow-lg rounded-lg border border-gray-200 max-w-lg mt-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Form Details</h2>
      <ul className="space-y-4">
        <li className="text-lg">
          <span className="font-semibold text-gray-700">Name:</span> {formData.name || 'N/A'}
        </li>
        <li className="text-lg">
          <span className="font-semibold text-gray-700">Email:</span> {formData.email || 'N/A'}
        </li>
        <li className="text-lg">
          <span className="font-semibold text-gray-700">Country:</span> {formData.country || 'N/A'}
        </li>
        <li className="text-lg">
          <span className="font-semibold text-gray-700">City:</span> {formData.city || 'N/A'}
        </li>
        <li className="text-lg">
          <span className="font-semibold text-gray-700">Population:</span> {cityPopulation !== null ? cityPopulation : 'Loading...'}
        </li>
      </ul>
      <button
        type="button"
        onClick={handleForm}
        className="w-full bg-blue-600 mt-6 text-white p-3 rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
      >
        Back to Form
      </button>
    </div>
  );
};

export default UserForm;
