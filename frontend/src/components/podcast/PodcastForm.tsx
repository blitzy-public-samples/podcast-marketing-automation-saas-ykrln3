import React, { useState, useEffect } from 'react';
import { usePodcast } from '../../hooks/usePodcast';
import { Podcast } from '../../types';
import Input from '../common/Input';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import FileUpload from '../common/FileUpload';

interface PodcastFormProps {
  podcast: Podcast | null;
  onSubmit: (podcast: Podcast) => void;
  onCancel: () => void;
}

const PodcastForm: React.FC<PodcastFormProps> = ({ podcast, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Podcast>>({
    title: '',
    description: '',
    coverImageUrl: '',
    rssFeedUrl: '',
    status: 'active',
    category: '',
    language: 'en',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Podcast, string>>>({});
  const { createPodcast, updatePodcast } = usePodcast();

  useEffect(() => {
    if (podcast) {
      setFormData(podcast);
    }
  }, [podcast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleCoverImageUpload = (file: File) => {
    // TODO: Implement image upload and cropping functionality
    console.log('Cover image uploaded:', file);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Podcast, string>> = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.rssFeedUrl) newErrors.rssFeedUrl = 'RSS Feed URL is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (podcast) {
        await updatePodcast(formData as Podcast);
      } else {
        await createPodcast(formData as Podcast);
      }
      onSubmit(formData as Podcast);
    } catch (error) {
      console.error('Error submitting podcast:', error);
      // TODO: Display error message to user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        required
      />
      <Input
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        required
        multiline
      />
      <FileUpload
        label="Cover Image"
        onFileSelect={handleCoverImageUpload}
        accept="image/*"
      />
      <Input
        label="RSS Feed URL"
        name="rssFeedUrl"
        value={formData.rssFeedUrl}
        onChange={handleChange}
        error={errors.rssFeedUrl}
        required
      />
      <Dropdown
        label="Status"
        name="status"
        value={formData.status}
        onChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
        options={[
          { value: 'active', label: 'Active' },
          { value: 'paused', label: 'Paused' },
          { value: 'archived', label: 'Archived' },
        ]}
      />
      <Input
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
      />
      <Input
        label="Language"
        name="language"
        value={formData.language}
        onChange={handleChange}
      />
      <div>
        <Button type="submit">{podcast ? 'Update' : 'Create'} Podcast</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default PodcastForm;