import React, { useState } from 'react';

const Filter = (props: any) => {
  const { data, onFilter } = props
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleFilterChange = (e: any) => {
    setSelectedFilter(e.target.value);
    filterData(e.target.value, selectedStatus);
  };

  const handleStatusChange = (e: any) => {
    setSelectedStatus(e.target.value);
    filterData(selectedFilter, e.target.value);
  };

  const time: any[] = []
  data.forEach((item: any) => {
    time.push(item.lastModified)
  });
  const filterData = (filterBy: any, filterStatus: any) => {
    // Implement your filtering logic here based on 'filterBy' and 'filterStatus'.
    // You can use the 'data' prop to access the original data and filter it accordingly.
    if (filterBy === 'date' && filterStatus === 'all') {
        console.log('sort')
        const sortedData = data.sort((a: any, b: any) => {
            const dateA = a.lastModified.toDate();
            const dateB = b.lastModified.toDate();

            // Compare dates to sort in ascending order
            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;
            return 0;
        })
        onFilter(sortedData)
    }
    const filteredData = data.filter((item: any) => {
      if (filterBy === 'all' && filterStatus === 'all') {
        return true;
      } else if (filterBy === 'status' && filterStatus === 'all') {
        return true;
      } else if (filterBy === 'status' && filterStatus === 'Draft') {
        return item.status === "Draft";;
      } else if (filterBy === 'status' && filterStatus === 'Published') {
        return item.status === "Published";
      } 
    });

    // Call the onFilter function to send the filtered data to the parent component
    onFilter(filteredData);
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 space-x-4">
      <div className="w-1/2">
        <label className="block text-gray-700 text-sm font-bold">Filter By:</label>
        <select
          className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-300 focus:outline-none"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="date">Date</option>
          <option value="status">Status</option>
        </select>
      </div>
      <div className="w-1/2">
        <label className="block text-gray-700 text-sm font-bold">Status:</label>
        <select
          className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-300 focus:outline-none"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="all">All</option>
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
