import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockProvider } from '../../test-utils/MockProvider';
import { mockPodcastData, mockAnalyticsData } from '../../test-utils/mockData';
import { Dashboard } from '../../../src/pages/Dashboard';

describe('Dashboard page', () => {
  beforeEach(() => {
    // Reset mocks and test data
    jest.clearAllMocks();
  });

  it('renders dashboard with loading state', () => {
    render(
      <MockProvider>
        <Dashboard />
      </MockProvider>
    );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
    expect(screen.queryByTestId('dashboard-content')).not.toBeInTheDocument();
  });

  it('displays podcast list after data fetch', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockPodcastData),
    } as any);

    render(
      <MockProvider>
        <Dashboard />
      </MockProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('podcast-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('podcast-item')).toHaveLength(mockPodcastData.length);
    mockPodcastData.forEach(podcast => {
      expect(screen.getByText(podcast.title)).toBeInTheDocument();
    });
  });

  it('shows performance metrics for selected podcast', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockPodcastData),
    } as any).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockAnalyticsData),
    } as any);

    render(
      <MockProvider>
        <Dashboard />
      </MockProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });

    userEvent.click(screen.getAllByTestId('podcast-item')[0]);

    await waitFor(() => {
      expect(screen.getByTestId('performance-metrics')).toBeInTheDocument();
    });

    expect(screen.getByText(`Total Listens: ${mockAnalyticsData.totalListens}`)).toBeInTheDocument();
    expect(screen.getByText(`Average Duration: ${mockAnalyticsData.averageDuration}`)).toBeInTheDocument();
  });

  it('updates chart data when time range changes', async () => {
    const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockPodcastData),
    } as any).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockAnalyticsData),
    } as any);

    render(
      <MockProvider>
        <Dashboard />
      </MockProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });

    userEvent.selectOptions(screen.getByTestId('time-range-picker'), ['last-month']);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('timeRange=last-month'));
    });

    expect(screen.getByTestId('performance-chart')).toHaveAttribute('data-time-range', 'last-month');
  });

  it('displays recent activities', async () => {
    const mockActivities = [
      { id: 1, type: 'episode_published', date: '2023-05-01' },
      { id: 2, type: 'new_subscriber', date: '2023-05-02' },
    ];

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockPodcastData),
    } as any).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockActivities),
    } as any);

    render(
      <MockProvider>
        <Dashboard />
      </MockProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('recent-activities')).toBeInTheDocument();
    });

    expect(screen.getAllByTestId('activity-item')).toHaveLength(mockActivities.length);
    mockActivities.forEach(activity => {
      expect(screen.getByText(activity.type)).toBeInTheDocument();
      expect(screen.getByText(activity.date)).toBeInTheDocument();
    });
  });

  it('allows navigation to podcast details', async () => {
    const mockNavigate = jest.fn();
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockPodcastData),
    } as any);

    render(
      <MockProvider navigate={mockNavigate}>
        <Dashboard />
      </MockProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });

    userEvent.click(screen.getAllByTestId('podcast-item')[0]);

    expect(mockNavigate).toHaveBeenCalledWith(`/podcasts/${mockPodcastData[0].id}`);
  });
});