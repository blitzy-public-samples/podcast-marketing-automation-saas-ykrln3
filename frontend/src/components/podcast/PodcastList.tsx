import React, { useState, useEffect } from 'react';
import { usePodcast } from '../../hooks/usePodcast';
import { Podcast } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import Input from '../common/Input';
import Pagination from '../common/Pagination';

interface PodcastListProps {
  onPodcastSelect: (podcast: Podcast) => void;
}

export const PodcastList: React.FC<PodcastListProps> = ({ onPodcastSelect }) => {
  const { podcasts, loading, error } = usePodcast();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState('title');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    // Fetch podcasts when component mounts
    // This is handled by the usePodcast hook
  }, []);

  const sortPodcasts = (podcastsToSort: Podcast[]) => {
    return [...podcastsToSort].sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'createdAt') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });
  };

  const filterPodcasts = (podcastsToFilter: Podcast[]) => {
    return podcastsToFilter.filter(podcast =>
      podcast.title.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  const paginatePodcasts = (podcastsToPaginate: Podcast[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return podcastsToPaginate.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading podcasts...</div>;
  }

  if (error) {
    return <div>Error fetching podcasts: {error}</div>;
  }

  const sortedPodcasts = sortPodcasts(podcasts);
  const filteredPodcasts = filterPodcasts(sortedPodcasts);
  const paginatedPodcasts = paginatePodcasts(filteredPodcasts);

  return (
    <div className="podcast-list">
      <div className="podcast-list-controls">
        <Dropdown
          options={[
            { value: 'title', label: 'Sort by Title' },
            { value: 'createdAt', label: 'Sort by Date' }
          ]}
          value={sortBy}
          onChange={handleSortChange}
        />
        <Input
          type="text"
          placeholder="Filter podcasts..."
          value={filterText}
          onChange={handleFilterChange}
        />
      </div>
      <div className="podcast-grid">
        {paginatedPodcasts.map(podcast => (
          <Card key={podcast.id} className="podcast-card">
            <img src={podcast.coverImageUrl} alt={podcast.title} />
            <h3>{podcast.title}</h3>
            <p>{podcast.description}</p>
            <Button onClick={() => onPodcastSelect(podcast)}>View Details</Button>
          </Card>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={filteredPodcasts.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};