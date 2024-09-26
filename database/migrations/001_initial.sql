-- Create Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    profile_picture VARCHAR(255),
    bio TEXT,
    website VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    is_staff BOOLEAN DEFAULT FALSE
);

-- Create Podcasts table
CREATE TABLE podcasts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    cover_image_url VARCHAR(255),
    rss_feed_url VARCHAR(500) UNIQUE NOT NULL,
    website VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active',
    category VARCHAR(100),
    language VARCHAR(50) DEFAULT 'en'
);

-- Create Episodes table
CREATE TABLE episodes (
    id SERIAL PRIMARY KEY,
    podcast_id INTEGER REFERENCES podcasts(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    audio_file_url VARCHAR(500) NOT NULL,
    duration INTEGER,
    publish_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'draft',
    episode_number INTEGER,
    season_number INTEGER,
    transcript TEXT,
    show_notes TEXT
);

-- Create Marketing Content table
CREATE TABLE marketing_content (
    id SERIAL PRIMARY KEY,
    episode_id INTEGER REFERENCES episodes(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_approved BOOLEAN DEFAULT FALSE
);

-- Create Social Media Posts table
CREATE TABLE social_media_posts (
    id SERIAL PRIMARY KEY,
    marketing_content_id INTEGER REFERENCES marketing_content(id) ON DELETE CASCADE,
    scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
    posted_time TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'scheduled',
    post_url VARCHAR(500)
);

-- Create Analytics Data table
CREATE TABLE analytics_data (
    id SERIAL PRIMARY KEY,
    podcast_id INTEGER REFERENCES podcasts(id) ON DELETE CASCADE,
    episode_id INTEGER REFERENCES episodes(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    listens INTEGER DEFAULT 0,
    unique_listeners INTEGER DEFAULT 0,
    average_listen_duration FLOAT,
    total_listen_time INTEGER,
    listener_retention_rate FLOAT,
    engagement_rate FLOAT,
    social_shares INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0
);

-- Create indexes for frequently queried columns
CREATE INDEX idx_podcasts_user_id ON podcasts(user_id);
CREATE INDEX idx_episodes_podcast_id ON episodes(podcast_id);
CREATE INDEX idx_marketing_content_episode_id ON marketing_content(episode_id);
CREATE INDEX idx_social_media_posts_marketing_content_id ON social_media_posts(marketing_content_id);
CREATE INDEX idx_analytics_data_podcast_id ON analytics_data(podcast_id);
CREATE INDEX idx_analytics_data_episode_id ON analytics_data(episode_id);
CREATE INDEX idx_analytics_data_date ON analytics_data(date);