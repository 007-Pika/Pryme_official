import React from "react";
import ServicesTabs from "../components/AddServices/ServicesTabs";
import ServicesList from "../components/AllServices/ServicesList";

const AllServices = () => {
  return (
    <div className="">
      <ServicesTabs />
      <ServicesList />
    </div>
  );
};

export default AllServices;
