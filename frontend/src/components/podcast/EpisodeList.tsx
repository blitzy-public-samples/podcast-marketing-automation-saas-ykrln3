import React, { useState, useEffect } from 'react';
import { useEpisode } from '../../hooks/useEpisode';
import { Episode } from '../../types';
import Table from '../common/Table';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import Input from '../common/Input';
import Pagination from '../common/Pagination';
import { formatDate } from '../../utils/date';
import { formatDuration } from '../../utils/formatting';

interface EpisodeListProps {
  podcastId: string;
  onEpisodeSelect: (episode: Episode) => void;
}

const EpisodeList: React.FC<EpisodeListProps> = ({ podcastId, onEpisodeSelect }) => {
  const { episodes, loading, error, fetchEpisodes } = useEpisode(podcastId);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState<keyof Episode>('publishDate');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    fetchEpisodes();
  }, [podcastId, fetchEpisodes]);

  const sortedEpisodes = [...episodes].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1;
    if (a[sortBy] > b[sortBy]) return 1;
    return 0;
  });

  const filteredEpisodes = sortedEpisodes.filter(episode =>
    episode.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const paginatedEpisodes = filteredEpisodes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'publishDate', label: 'Publish Date', sortable: true, format: (date: string) => formatDate(date) },
    { key: 'duration', label: 'Duration', sortable: true, format: (duration: number) => formatDuration(duration) },
    { key: 'status', label: 'Status', sortable: true },
  ];

  const handleSort = (key: keyof Episode) => {
    setSortBy(key);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading episodes...</div>;
  }

  if (error) {
    return <div>Error fetching episodes: {error}</div>;
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <Input
          placeholder="Filter episodes"
          value={filterText}
          onChange={handleFilter}
        />
        <Dropdown
          options={columns.filter(col => col.sortable).map(col => ({ value: col.key, label: col.label }))}
          value={sortBy}
          onChange={(value) => setSortBy(value as keyof Episode)}
          placeholder="Sort by"
        />
      </div>
      <Table
        columns={columns}
        data={paginatedEpisodes}
        onRowClick={onEpisodeSelect}
        onSort={handleSort}
        sortBy={sortBy}
      />
      <Pagination
        currentPage={currentPage}
        totalItems={filteredEpisodes.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default EpisodeList;