-- Create Marketing Campaigns table
CREATE TABLE marketing_campaigns (
    id SERIAL PRIMARY KEY,
    podcast_id INTEGER REFERENCES podcasts(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    status VARCHAR(20) DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Marketing Tasks table
CREATE TABLE marketing_tasks (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER REFERENCES marketing_campaigns(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    status VARCHAR(20) DEFAULT 'pending',
    assigned_to INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add campaign_id to marketing_content table
ALTER TABLE marketing_content
ADD COLUMN campaign_id INTEGER REFERENCES marketing_campaigns(id) ON DELETE SET NULL;

-- Create Audience Segments table
CREATE TABLE audience_segments (
    id SERIAL PRIMARY KEY,
    podcast_id INTEGER REFERENCES podcasts(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    criteria JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Marketing Performance table
CREATE TABLE marketing_performance (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER REFERENCES marketing_campaigns(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    spend DECIMAL(10, 2) DEFAULT 0,
    roi DECIMAL(5, 2)
);

-- Add indexes for new tables
CREATE INDEX idx_marketing_campaigns_podcast_id ON marketing_campaigns(podcast_id);
CREATE INDEX idx_marketing_tasks_campaign_id ON marketing_tasks(campaign_id);
CREATE INDEX idx_marketing_content_campaign_id ON marketing_content(campaign_id);
CREATE INDEX idx_audience_segments_podcast_id ON audience_segments(podcast_id);
CREATE INDEX idx_marketing_performance_campaign_id ON marketing_performance(campaign_id);
CREATE INDEX idx_marketing_performance_date ON marketing_performance(date);