import React, { useState, useEffect } from 'react';
import { useMarketing } from '../../hooks/useMarketing';
import { Episode, MarketingContent } from '../../types';
import Button from '../common/Button';
import Input from '../common/Input';
import TextArea from '../common/TextArea';
import Dropdown from '../common/Dropdown';
import Card from '../common/Card';
import Spinner from '../common/Spinner';

interface ContentGeneratorProps {
  episode: Episode;
  onContentGenerated: (content: MarketingContent[]) => void;
}

const ContentGenerator: React.FC<ContentGeneratorProps> = ({ episode, onContentGenerated }) => {
  const { generateMarketingContent } = useMarketing();
  const [generationOptions, setGenerationOptions] = useState({
    platforms: [],
    tone: 'neutral',
    length: 'medium',
  });
  const [generatedContent, setGeneratedContent] = useState<MarketingContent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionChange = (option: string, value: any) => {
    setGenerationOptions(prev => ({ ...prev, [option]: value }));
  };

  const handleGenerateContent = async () => {
    setIsLoading(true);
    try {
      const content = await generateMarketingContent(episode.id, generationOptions);
      setGeneratedContent(content);
    } catch (error) {
      console.error('Failed to generate content:', error);
      // TODO: Implement proper error handling
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentEdit = (index: number, newContent: string) => {
    setGeneratedContent(prev => 
      prev.map((item, i) => i === index ? { ...item, content: newContent } : item)
    );
  };

  const handleSaveContent = () => {
    onContentGenerated(generatedContent);
  };

  useEffect(() => {
    if (generatedContent.length > 0) {
      onContentGenerated(generatedContent);
    }
  }, [generatedContent, onContentGenerated]);

  return (
    <div className="content-generator">
      <h2>Generate Marketing Content</h2>
      <form>
        <Dropdown
          options={['Twitter', 'Facebook', 'Instagram', 'LinkedIn']}
          value={generationOptions.platforms}
          onChange={(value) => handleOptionChange('platforms', value)}
          placeholder="Select platforms"
          isMulti
        />
        <Dropdown
          options={['casual', 'professional', 'humorous', 'formal']}
          value={generationOptions.tone}
          onChange={(value) => handleOptionChange('tone', value)}
          placeholder="Select tone"
        />
        <Dropdown
          options={['short', 'medium', 'long']}
          value={generationOptions.length}
          onChange={(value) => handleOptionChange('length', value)}
          placeholder="Select content length"
        />
        <Button onClick={handleGenerateContent} disabled={isLoading}>
          Generate Content
        </Button>
      </form>

      {isLoading && <Spinner />}

      {generatedContent.map((content, index) => (
        <Card key={index}>
          <h3>{content.platform}</h3>
          <TextArea
            value={content.content}
            onChange={(e) => handleContentEdit(index, e.target.value)}
          />
        </Card>
      ))}

      {generatedContent.length > 0 && (
        <Button onClick={handleSaveContent}>Save and Apply Content</Button>
      )}
    </div>
  );
};

export default ContentGenerator;