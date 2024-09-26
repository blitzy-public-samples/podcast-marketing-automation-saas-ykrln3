import React from 'react';
import { MarketingContent, SocialMediaPlatform } from '../../types';
import Card from '../common/Card';
import Icon from '../common/Icon';
import Image from '../common/Image';

interface SocialMediaPreviewProps {
  content: MarketingContent;
  platform: SocialMediaPlatform;
}

const SocialMediaPreview: React.FC<SocialMediaPreviewProps> = ({ content, platform }) => {
  const renderHeader = () => {
    switch (platform) {
      case 'TWITTER':
        return (
          <div className="flex items-center mb-2">
            <Image src="/twitter-profile.jpg" alt="Twitter Profile" className="w-10 h-10 rounded-full mr-2" />
            <div>
              <p className="font-bold">Your Podcast</p>
              <p className="text-sm text-gray-500">@YourPodcast</p>
            </div>
          </div>
        );
      case 'FACEBOOK':
        return (
          <div className="flex items-center mb-2">
            <Image src="/facebook-profile.jpg" alt="Facebook Profile" className="w-10 h-10 rounded-full mr-2" />
            <div>
              <p className="font-bold">Your Podcast</p>
              <p className="text-sm text-gray-500">2h · <Icon name="globe" /></p>
            </div>
          </div>
        );
      case 'INSTAGRAM':
        return (
          <div className="flex items-center mb-2">
            <Image src="/instagram-profile.jpg" alt="Instagram Profile" className="w-10 h-10 rounded-full mr-2" />
            <p className="font-bold">yourpodcast</p>
          </div>
        );
      case 'LINKEDIN':
        return (
          <div className="flex items-center mb-2">
            <Image src="/linkedin-profile.jpg" alt="LinkedIn Profile" className="w-10 h-10 rounded-full mr-2" />
            <div>
              <p className="font-bold">Your Podcast</p>
              <p className="text-sm text-gray-500">1,234 followers</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    return (
      <div className="mb-4">
        <p className={`${platform === 'TWITTER' ? 'text-lg' : 'text-base'}`}>{content.content}</p>
        {content.contentType === 'POST' && content.imageUrl && (
          <Image src={content.imageUrl} alt="Post image" className="mt-2 rounded-lg w-full" />
        )}
      </div>
    );
  };

  const renderActionButtons = () => {
    switch (platform) {
      case 'TWITTER':
        return (
          <div className="flex justify-between text-gray-500">
            <Icon name="message-circle" /> <Icon name="repeat" /> <Icon name="heart" /> <Icon name="share" />
          </div>
        );
      case 'FACEBOOK':
        return (
          <div className="flex justify-between text-gray-500">
            <div><Icon name="thumbs-up" /> Like</div>
            <div><Icon name="message-square" /> Comment</div>
            <div><Icon name="share-2" /> Share</div>
          </div>
        );
      case 'INSTAGRAM':
        return (
          <div className="flex justify-between text-gray-500">
            <div className="flex">
              <Icon name="heart" className="mr-4" />
              <Icon name="message-circle" className="mr-4" />
              <Icon name="send" />
            </div>
            <Icon name="bookmark" />
          </div>
        );
      case 'LINKEDIN':
        return (
          <div className="flex justify-between text-gray-500">
            <div><Icon name="thumbs-up" /> Like</div>
            <div><Icon name="message-square" /> Comment</div>
            <div><Icon name="share-2" /> Share</div>
            <div><Icon name="send" /> Send</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`max-w-md mx-auto ${platform.toLowerCase()}-preview`}>
      {renderHeader()}
      {renderContent()}
      {renderActionButtons()}
    </Card>
  );
};

export default SocialMediaPreview;