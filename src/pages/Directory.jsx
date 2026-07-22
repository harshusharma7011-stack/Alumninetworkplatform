import { useState } from 'react';

const Directory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [batchFilter, setBatchFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');

  const alumni = [
    { id: 1, name: 'Harshita Sharma', initials: 'HS', company: 'Google', role: 'Software Engineer', location: 'Bangalore, India', batch: '2022', industry: 'Technology' },
    { id: 2, name: 'Rohit Sharma', initials: 'RS', company: 'Goldman Sachs', role: 'Data Analyst', location: 'Mumbai, India', batch: '2021', industry: 'Finance' },
    { id: 3, name: 'Anjali Gupta', initials: 'AG', company: 'Microsoft', role: 'UI/UX Designer', location: 'Delhi, India', batch: '2022', industry: 'Technology' },
    { id: 4, name: 'Vikram Singh', initials: 'VS', company: 'Amazon', role: 'Product Manager', location: 'Hyderabad, India', batch: '2020', industry: 'Technology' },
    { id: 5, name: 'Priya Patel', initials: 'PP', company: 'Apollo Hospitals', role: 'Healthcare Analyst', location: 'Chennai, India', batch: '2021', industry: 'Healthcare' },
    { id: 6, name: 'Amit Kumar', initials: 'AK', company: 'Infosys', role: 'Senior Developer', location: 'Pune, India', batch: '2019', industry: 'Technology' },
    { id: 7, name: 'Sneha Reddy', initials: 'SR', company: 'Deloitte', role: 'Business Consultant', location: 'Bangalore, India', batch: '2023', industry: 'Consulting' },
    { id: 8, name: 'Rahul Mehta', initials: 'RM', company: 'Meta', role: 'Engineering Manager', location: 'San Francisco, USA', batch: '2018', industry: 'Technology' },
    { id: 9, name: 'Neha Kapoor', initials: 'NK', company: 'JP Morgan', role: 'Investment Banker', location: 'Mumbai, India', batch: '2022', industry: 'Finance' },
  ];

  const filteredAlumni = alumni.filter(alum => {
    const matchesSearch = alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alum.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alum.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = !batchFilter || alum.batch === batchFilter;
    const matchesLocation = !locationFilter || alum.location.includes(locationFilter);
    const matchesIndustry = !industryFilter || alum.industry === industryFilter;
    
    return matchesSearch && matchesBatch && matchesLocation && matchesIndustry;
  });

  const handleConnect = (id) => {
    alert(`Connection request sent to alumni #${id}`);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setBatchFilter('');
    setLocationFilter('');
    setIndustryFilter('');
  };

  return (
    <div>
      {/* Directory Header */}
      <div className="directory-header">
        <div className="container text-center">
          <h1>Alumni Directory</h1>
          <p>Find and connect with alumni from your university</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="directory-search">
        <div className="search-bar">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search alumni by name, company, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filters">
          <select 
            className="form-control filter-select"
            value={batchFilter}
            onChange={(e) => setBatchFilter(e.target.value)}
          >
            <option value="">All Batches</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
          </select>
          <select 
            className="form-control filter-select"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">All Locations</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
            <option value="Pune">Pune</option>
            <option value="International">International</option>
          </select>
          <select 
            className="form-control filter-select"
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
          >
            <option value="">All Industries</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Consulting">Consulting</option>
            <option value="Manufacturing">Manufacturing</option>
          </select>
          <button className="btn btn-secondary" onClick={resetFilters}>Reset Filters</button>
        </div>
      </div>

      {/* Alumni Grid */}
      <div className="alumni-grid">
        {filteredAlumni.map(alum => (
          <div key={alum.id} className="alumni-card">
            <div className="alumni-card-avatar">{alum.initials}</div>
            <h4>{alum.name}</h4>
            <div className="company">{alum.company}</div>
            <div className="role">{alum.role}</div>
            <div className="location">📍 {alum.location}</div>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => handleConnect(alum.id)}
            >
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Directory;
