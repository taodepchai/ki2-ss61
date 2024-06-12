import React from 'react';

interface FilterButtonsProps {
  setFilter: (filter: 'all' | 'completed' | 'active') => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ setFilter }) => (
  <div className="filter-buttons">
    <button onClick={() => setFilter('all')}>Tất cả</button>
    <button onClick={() => setFilter('completed')}>Hoàn thành</button>
    <button onClick={() => setFilter('active')}>Đang thực hiện</button>
  </div>
);

export default FilterButtons;
