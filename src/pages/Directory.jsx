import { useEffect, useState } from 'react';
import { directoryApi } from '../services/api';

const Directory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [batchFilter, setBatchFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await directoryApi.getAll({
          search: searchTerm,
          batch: batchFilter,
          location: locationFilter,
          industry: industryFilter
        });
        setAlumni(response.alumni || []);
      } catch (err) {
        setError(err.message || 'Unable to load alumni');
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, [searchTerm, batchFilter, locationFilter, industryFilter]);

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
      {loading ? <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading alumni...</p> : null}
      {error ? <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--danger)' }}>{error}</p> : null}
      <div className="alumni-grid">
        {!loading && !error && alumni.map(alum => (
          <div key={alum._id} className="alumni-card">
            <div className="alumni-card-avatar">{alum.initials || `${alum.name?.split(' ')[0]?.[0] || ''}${alum.name?.split(' ')[1]?.[0] || ''}`}</div>
            <h4>{alum.name}</h4>
            <div className="company">{alum.company}</div>
            <div className="role">{alum.role}</div>
            <div className="location">📍 {alum.location}</div>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => handleConnect(alum._id)}
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
