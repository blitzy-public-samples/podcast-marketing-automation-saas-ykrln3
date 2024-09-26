import React, { useState, useEffect } from 'react';
import { useMarketing } from '../../hooks/useMarketing';
import { SocialMediaPost } from '../../types';
import Calendar from '../common/Calendar';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import SocialMediaPreview from './SocialMediaPreview';
import { formatDate } from '../../utils/date';

interface ScheduleCalendarProps {
  podcastId: string;
  onScheduleUpdate: (scheduledPosts: SocialMediaPost[]) => void;
}

const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({ podcastId, onScheduleUpdate }) => {
  const { scheduleSocialMediaPost, fetchScheduledPosts } = useMarketing();
  const [scheduledPosts, setScheduledPosts] = useState<SocialMediaPost[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedPost, setSelectedPost] = useState<SocialMediaPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchScheduledPosts(podcastId).then(setScheduledPosts).catch(handleError);
  }, [podcastId, fetchScheduledPosts]);

  useEffect(() => {
    onScheduleUpdate(scheduledPosts);
  }, [scheduledPosts, onScheduleUpdate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handlePostSelect = (post: SocialMediaPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleSchedulePost = async (post: SocialMediaPost) => {
    try {
      const newPost = await scheduleSocialMediaPost(post);
      setScheduledPosts([...scheduledPosts, newPost]);
      setSuccess('Post scheduled successfully');
      setIsModalOpen(false);
    } catch (err) {
      handleError(err);
    }
  };

  const handleUpdatePost = async (updatedPost: SocialMediaPost) => {
    try {
      const updated = await scheduleSocialMediaPost(updatedPost);
      setScheduledPosts(scheduledPosts.map(post => post.id === updated.id ? updated : post));
      setSuccess('Post updated successfully');
      setIsModalOpen(false);
    } catch (err) {
      handleError(err);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await scheduleSocialMediaPost({ ...selectedPost!, id: postId, status: 'deleted' });
      setScheduledPosts(scheduledPosts.filter(post => post.id !== postId));
      setSuccess('Post deleted successfully');
      setIsModalOpen(false);
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (err: any) => {
    setError(err.message || 'An error occurred');
    setTimeout(() => setError(null), 5000);
  };

  return (
    <div className="schedule-calendar">
      <Calendar
        events={scheduledPosts.map(post => ({
          date: new Date(post.scheduledTime),
          title: post.content.substring(0, 20) + '...',
          onClick: () => handlePostSelect(post)
        }))}
        onDateSelect={handleDateSelect}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedPost ? (
          <>
            <h2>Edit Scheduled Post</h2>
            <SocialMediaPreview post={selectedPost} />
            <Dropdown
              options={['twitter', 'facebook', 'instagram', 'linkedin']}
              value={selectedPost.platform}
              onChange={(value) => setSelectedPost({ ...selectedPost, platform: value })}
            />
            <input
              type="datetime-local"
              value={formatDate(selectedPost.scheduledTime, 'YYYY-MM-DDTHH:mm')}
              onChange={(e) => setSelectedPost({ ...selectedPost, scheduledTime: new Date(e.target.value) })}
            />
            <Button onClick={() => handleUpdatePost(selectedPost)}>Update Post</Button>
            <Button onClick={() => handleDeletePost(selectedPost.id)}>Delete Post</Button>
          </>
        ) : (
          <>
            <h2>Schedule New Post</h2>
            <Dropdown
              options={['twitter', 'facebook', 'instagram', 'linkedin']}
              onChange={(value) => setSelectedPost({ ...selectedPost!, platform: value })}
            />
            <input
              type="datetime-local"
              value={selectedDate ? formatDate(selectedDate, 'YYYY-MM-DDTHH:mm') : ''}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
            <Button onClick={() => handleSchedulePost({ ...selectedPost!, scheduledTime: selectedDate! })}>
              Schedule Post
            </Button>
          </>
        )}
      </Modal>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default ScheduleCalendar;