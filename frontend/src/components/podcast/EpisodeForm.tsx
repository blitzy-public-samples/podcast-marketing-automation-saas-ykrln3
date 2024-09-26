import React, { useState, useEffect } from 'react';
import { useEpisode } from '../../hooks/useEpisode';
import { Episode } from '../../types';
import Input from '../common/Input';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import FileUpload from '../common/FileUpload';
import TextArea from '../common/TextArea';
import DatePicker from '../common/DatePicker';

interface EpisodeFormProps {
  podcastId: string;
  episode: Episode | null;
  onSubmit: (episode: Episode) => void;
  onCancel: () => void;
}

const EpisodeForm: React.FC<EpisodeFormProps> = ({ podcastId, episode, onSubmit, onCancel }) => {
  const { createEpisode, updateEpisode } = useEpisode(podcastId);

  const [formData, setFormData] = useState<Partial<Episode>>({
    title: '',
    description: '',
    audioFileUrl: '',
    duration: 0,
    publishDate: new Date(),
    status: 'draft',
    episodeNumber: 0,
    seasonNumber: null,
    transcript: '',
    showNotes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Episode, string>>>({});

  useEffect(() => {
    if (episode) {
      setFormData(episode);
    }
  }, [episode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleAudioFileUpload = (file: File) => {
    // TODO: Implement audio file upload logic
    console.log('Audio file uploaded:', file);
    setFormData((prev) => ({ ...prev, audioFileUrl: 'dummy_url_for_now' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        if (episode) {
          await updateEpisode(formData as Episode);
        } else {
          await createEpisode(formData as Episode);
        }
        onSubmit(formData as Episode);
      } catch (error) {
        console.error('Error submitting episode:', error);
        // TODO: Handle submission error (e.g., show error message to user)
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (): Partial<Record<keyof Episode, string>> => {
    const errors: Partial<Record<keyof Episode, string>> = {};
    if (!formData.title) errors.title = 'Title is required';
    if (!formData.description) errors.description = 'Description is required';
    if (!formData.audioFileUrl) errors.audioFileUrl = 'Audio file is required';
    if (formData.duration <= 0) errors.duration = 'Duration must be greater than 0';
    if (!formData.publishDate) errors.publishDate = 'Publish date is required';
    return errors;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="title"
        label="Episode Title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
      />
      <Input
        name="episodeNumber"
        label="Episode Number"
        type="number"
        value={formData.episodeNumber?.toString()}
        onChange={handleChange}
        error={errors.episodeNumber}
      />
      <Input
        name="seasonNumber"
        label="Season Number"
        type="number"
        value={formData.seasonNumber?.toString() || ''}
        onChange={handleChange}
        error={errors.seasonNumber}
      />
      <TextArea
        name="description"
        label="Episode Description"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
      />
      <FileUpload
        label="Audio File"
        accept="audio/*"
        onFileUpload={handleAudioFileUpload}
        error={errors.audioFileUrl}
      />
      <Input
        name="duration"
        label="Duration (in seconds)"
        type="number"
        value={formData.duration?.toString()}
        onChange={handleChange}
        error={errors.duration}
      />
      <DatePicker
        name="publishDate"
        label="Publish Date"
        value={formData.publishDate}
        onChange={(date) => setFormData((prev) => ({ ...prev, publishDate: date }))}
        error={errors.publishDate}
      />
      <Dropdown
        name="status"
        label="Episode Status"
        options={[
          { value: 'draft', label: 'Draft' },
          { value: 'scheduled', label: 'Scheduled' },
          { value: 'published', label: 'Published' },
          { value: 'archived', label: 'Archived' },
        ]}
        value={formData.status}
        onChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
        error={errors.status}
      />
      <TextArea
        name="transcript"
        label="Episode Transcript"
        value={formData.transcript}
        onChange={handleChange}
        error={errors.transcript}
      />
      <TextArea
        name="showNotes"
        label="Show Notes"
        value={formData.showNotes}
        onChange={handleChange}
        error={errors.showNotes}
      />
      <div>
        <Button type="submit">{episode ? 'Update Episode' : 'Create Episode'}</Button>
        <Button type="button" onClick={onCancel} variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EpisodeForm;