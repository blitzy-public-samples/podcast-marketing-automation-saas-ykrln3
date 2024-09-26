import pytest
from django.test import TestCase
from django.core.exceptions import ValidationError
from django.utils import timezone
from apps.podcasts.models import Podcast
from apps.users.models import User

class TestPodcastModel(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        self.podcast = Podcast.objects.create(
            user=self.user,
            title='Test Podcast',
            description='This is a test podcast',
            rss_feed_url='https://testpodcast.com/feed.xml',
            website='https://testpodcast.com',
            category='Technology',
            language='en'
        )

    def test_podcast_creation(self):
        self.assertIsInstance(self.podcast, Podcast)
        self.assertEqual(self.podcast.title, 'Test Podcast')
        self.assertEqual(self.podcast.user, self.user)
        self.assertEqual(self.podcast.rss_feed_url, 'https://testpodcast.com/feed.xml')
        self.assertEqual(self.podcast.category, 'Technology')
        self.assertEqual(self.podcast.language, 'en')

    def test_podcast_str_method(self):
        self.assertEqual(str(self.podcast), 'Test Podcast')

    def test_podcast_get_absolute_url(self):
        expected_url = f'/podcasts/{self.podcast.id}/'
        self.assertEqual(self.podcast.get_absolute_url(), expected_url)

    def test_podcast_rss_feed_url_unique(self):
        with self.assertRaises(ValidationError):
            Podcast.objects.create(
                user=self.user,
                title='Another Podcast',
                description='This is another podcast',
                rss_feed_url='https://testpodcast.com/feed.xml'  # Same as self.podcast
            )

    def test_podcast_title_max_length(self):
        max_length = Podcast._meta.get_field('title').max_length
        self.podcast.title = 'a' * (max_length + 1)
        with self.assertRaises(ValidationError):
            self.podcast.full_clean()

    def test_podcast_default_status(self):
        new_podcast = Podcast.objects.create(
            user=self.user,
            title='New Podcast',
            description='This is a new podcast',
            rss_feed_url='https://newpodcast.com/feed.xml'
        )
        self.assertEqual(new_podcast.status, 'active')

    def test_podcast_created_at_auto_now_add(self):
        self.assertIsNotNone(self.podcast.created_at)
        self.assertLessEqual(self.podcast.created_at, timezone.now())

# Additional tests as per pending human tasks

def test_podcast_invalid_rss_feed_format(self):
    with self.assertRaises(ValidationError):
        Podcast.objects.create(
            user=self.user,
            title='Invalid RSS Podcast',
            description='This podcast has an invalid RSS feed',
            rss_feed_url='not_a_valid_url'
        )

def test_podcast_extremely_long_description(self):
    max_length = Podcast._meta.get_field('description').max_length
    long_description = 'a' * (max_length + 1)
    with self.assertRaises(ValidationError):
        Podcast.objects.create(
            user=self.user,
            title='Long Description Podcast',
            description=long_description,
            rss_feed_url='https://longdesc.com/feed.xml'
        )

def test_podcast_episode_relationship(self):
    # Assuming there's an Episode model related to Podcast
    from apps.episodes.models import Episode
    episode = Episode.objects.create(
        podcast=self.podcast,
        title='Test Episode',
        audio_file_url='https://example.com/episode1.mp3'
    )
    self.assertIn(episode, self.podcast.episodes.all())

def test_podcast_category_validation(self):
    with self.assertRaises(ValidationError):
        Podcast.objects.create(
            user=self.user,
            title='Invalid Category Podcast',
            description='This podcast has an invalid category',
            rss_feed_url='https://invalidcategory.com/feed.xml',
            category='InvalidCategory'
        )

def test_podcast_language_validation(self):
    with self.assertRaises(ValidationError):
        Podcast.objects.create(
            user=self.user,
            title='Invalid Language Podcast',
            description='This podcast has an invalid language',
            rss_feed_url='https://invalidlanguage.com/feed.xml',
            language='xx'  # Assuming 'xx' is not a valid language code
        )

def test_podcast_update_and_updated_at(self):
    original_updated_at = self.podcast.updated_at
    self.podcast.title = 'Updated Test Podcast'
    self.podcast.save()
    self.podcast.refresh_from_db()
    self.assertGreater(self.podcast.updated_at, original_updated_at)
    self.assertEqual(self.podcast.title, 'Updated Test Podcast')

# Human task: Implement tests for any signals associated with the Podcast model
@pytest.mark.django_db
def test_podcast_post_save_signal(self):
    # This test assumes a post_save signal that performs some action
    # You'll need to implement the actual signal and replace this placeholder
    from django.db.models.signals import post_save
    from django.dispatch import receiver
    
    @receiver(post_save, sender=Podcast)
    def podcast_post_save_handler(sender, instance, created, **kwargs):
        if created:
            instance.status = 'pending_review'
            instance.save()

    new_podcast = Podcast.objects.create(
        user=self.user,
        title='Signal Test Podcast',
        description='This podcast tests the post_save signal',
        rss_feed_url='https://signaltest.com/feed.xml'
    )
    self.assertEqual(new_podcast.status, 'pending_review')