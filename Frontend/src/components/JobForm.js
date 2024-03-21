import React, { useState, useEffect } from "react";

function JobForm() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    generalDescription: "",
    totalResourcesRequired: "",
    desiredStartDate: "",
    timeZone: "",
    clientHours: {
      startTime: "",
      endTime: "",
    },
    languages: [],
    industry: "",
    resourceTabs: [
      {
        roleTitle: "",
        numberOfResources: "",
        primarySkills: [],
        experience: "",
        commitment: "",
        tasksAndDeliveries: "",
        requiredExperience: "",
        monthlyRate: "",
        jobType: "",
        city: "",
        estimateLengthOfRole: "",
        workdayOverlap: "",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleResourceTabChange = (index, e) => {
    const { name, value } = e.target;
    const updatedResourceTabs = [...formData.resourceTabs];
    updatedResourceTabs[index] = {
      ...updatedResourceTabs[index],
      [name]: value
    };
    setFormData(prevState => ({
      ...prevState,
      resourceTabs: updatedResourceTabs
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert(
        "An error occurred while submitting the form. Please try again later."
      );
    }
  };

  const addResourceTab = () => {
    setFormData((prevState) => ({
      ...prevState,
      resourceTabs: [
        ...prevState.resourceTabs,
        {
          roleTitle: "",
          numberOfResources: "",
          primarySkills: [],
          experience: "",
          commitment: "",
          tasksAndDeliveries: "",
          requiredExperience: "",
          monthlyRate: "",
          jobType: "",
          city: "",
          estimateLengthOfRole: "",
          workdayOverlap: "",
        },
      ],
    }));
  };

  const removeResourceTab = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      resourceTabs: prevState.resourceTabs.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem("formData"));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full px-2 mb-4">
            <label htmlFor="jobTitle" className="block font-semibold mb-1">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              placeholder="Enter Job Title"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="w-full px-2 mb-4">
            <label
              htmlFor="generalDescription"
              className="block font-semibold mb-1"
            >
              General Description
            </label>
            <textarea
              id="generalDescription"
              name="generalDescription"
              placeholder="Describe the product idea"
              value={formData.generalDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label
              htmlFor="totalResourcesRequired"
              className="block font-semibold mb-1"
            >
              Total Resources Required
            </label>
            <input
              type="number"
              id="totalResourcesRequired"
              name="totalResourcesRequired"
              placeholder="Select number of resources"
              value={formData.totalResourcesRequired}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label
              htmlFor="desiredStartDate"
              className="block font-semibold mb-1"
            >
              Desired Start Date
            </label>
            <input
              type="text"
              id="desiredStartDate"
              name="desiredStartDate"
              placeholder="Enter Desired Start Date"
              value={formData.desiredStartDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label htmlFor="timeZone" className="block font-semibold mb-1">
              Time Zone
            </label>
            <input
              type="text"
              id="timeZone"
              name="timeZone"
              placeholder="Enter Time Zone"
              value={formData.timeZone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label htmlFor="ClientHours" className="block font-semibold mb-1">
              Client Hours
            </label>
            <input
              type="text"
              id="clientStartHours"
              name="clientHours.startTime"
              placeholder="Enter client Start Time"
              value={formData.clientHours.startTime}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              id="clientEndHours"
              name="clientHours.endTimne"
              placeholder="Enter client End Time"
              value={formData.clientHours.endTime}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label htmlFor="industry" className="block font-semibold mb-1">
              Industry
            </label>
            <input
              type="text"
              id="industry"
              name="industry"
              placeholder="Enter Industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="w-full md:w-1/3 px-2">
          <label htmlFor="languages" className="block font-semibold mb-1">
            Languages
          </label>
          <input
            type="text"
            id="languages"
            name="languages"
            placeholder="Enter Languages"
            value={formData.languages}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        {formData.resourceTabs.map((resourceTab, index) => (
          <div key={index} className="border border-gray-200 p-4 rounded-md flex flex-wrap">
            <h2 className="w-full text-xl font-semibold mb-2">Resource {index + 1}</h2>
            <div className="mb-4 w-2/3 px-2">
              <label
                htmlFor={`roleTitle${index}`}
                className="block font-semibold mb-1"
              >
                Role Title
              </label>
              <input
                type="text"
                id={`roleTitle${index}`}
                name={`resourceTabs[${index}].roleTitle`}
                placeholder="Enter Role Title"
                value={resourceTab.roleTitle}
                onChange={(e) => handleResourceTabChange(index, e)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4 w-1/3 px-2">
              <label
                htmlFor={`numberOfResources${index}`}
                className="block font-semibold mb-1"
              >
                Number of Resources
              </label>
              <input
                type="number"
                id={`numberOfResources${index}`}
                name={`resourceTabs[${index}].numberOfResources`}
                placeholder="Enter Number of Resources"
                value={resourceTab.numberOfResources}
                onChange={(e) => handleResourceTabChange(index, e)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4 w-1/4 px-2">
              <label
                htmlFor={`primarySkills${index}`}
                className="block font-semibold mb-1"
              >
                Primary Skills
              </label>
              <input
                type="text"
                id={`primarySkills${index}`}
                name={`resourceTabs[${index}].primarySkills`}
                placeholder="Enter Primary Skills"
                value={resourceTab.primarySkills}
                onChange={(e) => handleResourceTabChange(index, e)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4 w-1/4 px-2">
              <label
                htmlFor={`experience${index}`}
                className="block font-semibold mb-1"
              >
                Experience
              </label>
              <select
                id={`experience${index}`}
                name={`resourceTabs[${index}].experience`}
                value={resourceTab.experience}
                onChange={(e) => handleResourceTabChange(index, e)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Experience</option>
                <option value="Entry">Entry</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
                <option value="Manager Level">Manager Level</option>
              </select>
            </div>
            <div className="mb-4 w-1/4 px-2">
              <label
                htmlFor={`commitment${index}`}
                className="block font-semibold mb-1"
              >
                Commitment
              </label>
              <select
                id={`commitment${index}`}
                name={`resourceTabs[${index}].commitment`}
                value={resourceTab.commitment}
                onChange={(e) => handleResourceTabChange(index, e)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Commitment</option>
                <option value="Full time">Full time</option>
                <option value="Part time">Part time</option>
              </select>
            </div>
            <div className="mb-4 px-2 w-1/4">
              <label
                htmlFor={`jobType${index}`}
                className="block font-semibold mb-1"
              >
                Job Type
              </label>
              <select
                id={`jobType${index}`}
                name={`resourceTabs[${index}].jobType`}
                value={resourceTab.jobType}
                onChange={(e) => handleResourceTabChange(index, e)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Job Type</option>
                <option value="On site">On site</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div className="mb-4 px-2 w-1/2">
              <label
                htmlFor={`tasksAndDeliveries${index}`}
                className="block font-semibold mb-1"
              >
                Tasks and Deliveries
              </label>
              <textarea
                id={`tasksAndDeliveries${index}`}
                name={`resourceTabs[${index}].tasksAndDeliveries`}
                placeholder="Enter Tasks and Deliveries"
                value={resourceTab.tasksAndDeliveries}
                onChange={(e) => handleResourceTabChange(index, e)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
            <div className="mb-4 px-2 w-1/2">
              <label
                htmlFor={`requiredExperience${index}`}
                className="block font-semibold mb-1"
              >
                Required Experience
              </label>
              <textarea
                id={`requiredExperience${index}`}
                name={`resourceTabs[${index}].requiredExperience`}
                placeholder="Enter Required Experience"
                value={resourceTab.requiredExperience}
                onChange={(e) => handleResourceTabChange(index, e)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
            <div className="mb-4 px-2 w-1/4">
              <label
                htmlFor={`monthlyRate${index}`}
                className="block font-semibold mb-1"
              >
                Monthly Rate
              </label>
              <input
                type="text"
                id={`monthlyRate${index}`}
                name={`resourceTabs[${index}].monthlyRate`}
                placeholder="Enter Monthly Rate"
                value={resourceTab.monthlyRate}
                onChange={(e) => handleResourceTabChange(index, e)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4 px-2 w-1/4">
              <label
                htmlFor={`city${index}`}
                className="block font-semibold mb-1"
              >
                City
              </label>
              <input
                type="text"
                id={`city${index}`}
                name={`resourceTabs[${index}].city`}
                placeholder="Enter City"
                value={resourceTab.city}
                onChange={(e) => handleResourceTabChange(index, e)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4 px-2 w-1/4">
              <label
                htmlFor={`estimateLengthOfRole${index}`}
                className="block font-semibold mb-1"
              >
                Estimate Length of Role
              </label>
              <select
                id={`estimateLengthOfRole${index}`}
                name={`resourceTabs[${index}].estimateLengthOfRole`}
                value={resourceTab.estimateLengthOfRole}
                onChange={(e) => handleResourceTabChange(index, e)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Estimate Length of Role</option>
                <option value="1-2 weeks">1-2 weeks</option>
                <option value="2-4 weeks">2-4 weeks</option>
                <option value="1-3 months">1-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6-12 months">6-12 months</option>
                <option value="12+ months">12+ months</option>
              </select>
            </div>
            <div className="mb-4 px-2 w-1/4">
              <label
                htmlFor={`workdayOverlap${index}`}
                className="block font-semibold mb-1"
              >
                Workday Overlap
              </label>
              <select
                id={`workdayOverlap${index}`}
                name={`resourceTabs[${index}].workdayOverlap`}
                value={resourceTab.workdayOverlap}
                onChange={(e) => handleResourceTabChange(index, e)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Workday Overlap</option>
                <option value="1 hour">1 hour</option>
                <option value="2 hours">2 hours</option>
                <option value="3 hours">3 hours</option>
                <option value="4 hours">4 hours</option>
                <option value="5 hours">5 hours</option>
                <option value="6 hours">6 hours</option>
                <option value="7 hours">7 hours</option>
                <option value="8 hours">8 hours</option>
              </select>
            </div>
            {index !== 0 && (
              <button
                type="button"
                onClick={() => removeResourceTab(index)}
                className="bg-red-500 text-white px-3 py-1 rounded-md mr-2"
              >
                Remove Resource
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addResourceTab}
          className="bg-green-500 text-white px-3 py-1 rounded-md"
        >
          Add Resource
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md items-end"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default JobForm;
