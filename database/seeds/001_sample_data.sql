-- Insert sample users
INSERT INTO users (email, username, password_hash, first_name, last_name, bio, website) VALUES
('john@example.com', 'johndoe', '$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'John', 'Doe', 'Podcast enthusiast and marketing guru', 'https://johndoe.com'),
('jane@example.com', 'janesmith', '$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'Jane', 'Smith', 'Audio producer and content creator', 'https://janesmith.com');

-- Insert sample podcasts
INSERT INTO podcasts (user_id, title, description, rss_feed_url, website, category, language) VALUES
(1, 'Tech Talk Weekly', 'A weekly discussion on the latest in technology', 'https://techtalkweekly.com/feed.xml', 'https://techtalkweekly.com', 'Technology', 'en'),
(2, 'History Unveiled', 'Exploring hidden gems of world history', 'https://historyunveiled.com/feed.xml', 'https://historyunveiled.com', 'History', 'en');

-- Insert sample episodes
INSERT INTO episodes (podcast_id, title, description, audio_file_url, duration, publish_date, status, episode_number) VALUES
(1, 'The Future of AI', 'Discussing the latest advancements in artificial intelligence', 'https://storage.example.com/ep001.mp3', 3600, CURRENT_TIMESTAMP - INTERVAL '7 days', 'published', 1),
(1, 'Cybersecurity Best Practices', 'Expert tips on keeping your digital life secure', 'https://storage.example.com/ep002.mp3', 2700, CURRENT_TIMESTAMP - INTERVAL '1 day', 'published', 2),
(2, 'The Lost City of Atlantis', 'Examining the myths and possible realities of Atlantis', 'https://storage.example.com/hist001.mp3', 4500, CURRENT_TIMESTAMP - INTERVAL '14 days', 'published', 1);

-- Insert sample marketing content
INSERT INTO marketing_content (episode_id, content, content_type, platform, is_approved) VALUES
(1, 'Tune in to our latest episode on AI advancements! #TechTalk #AI', 'post', 'twitter', true),
(2, 'Stay safe online with our expert cybersecurity tips. Listen now!', 'post', 'facebook', true),
(3, 'Uncover the mysteries of Atlantis in our newest episode. #HistoryUnveiled', 'post', 'instagram', true);

-- Insert sample social media posts
INSERT INTO social_media_posts (marketing_content_id, scheduled_time, status) VALUES
(1, CURRENT_TIMESTAMP + INTERVAL '1 day', 'scheduled'),
(2, CURRENT_TIMESTAMP + INTERVAL '2 days', 'scheduled'),
(3, CURRENT_TIMESTAMP + INTERVAL '3 days', 'scheduled');

-- Insert sample analytics data
INSERT INTO analytics_data (podcast_id, episode_id, date, listens, unique_listeners, average_listen_duration, total_listen_time, engagement_rate) VALUES
(1, 1, CURRENT_DATE - INTERVAL '7 days', 1000, 800, 2700, 2700000, 0.75),
(1, 2, CURRENT_DATE - INTERVAL '1 day', 500, 450, 2400, 1200000, 0.8),
(2, 3, CURRENT_DATE - INTERVAL '14 days', 1500, 1200, 3600, 5400000, 0.85);

-- Human tasks:
-- TODO: Review and adjust the sample data to ensure it aligns with the current database schema
-- TODO: Add more diverse sample data to cover edge cases and different scenarios
-- TODO: Ensure that the sample data includes examples for all tables in the database
-- TODO: Create sample data for the newly added marketing tables (marketing_campaigns, marketing_tasks, etc.)
-- TODO: Implement a mechanism to generate larger datasets for performance testing
-- TODO: Add sample data for different user roles (e.g., admin, regular user) if applicable
-- TODO: Ensure that the sample data respects all constraints and relationships defined in the schema