import pytest
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from apps.podcasts.models import Podcast
from apps.users.models import User
from datetime import datetime
import pytz

@pytest.fixture
def test_user():
    user = User.objects.create_user(
        username='testuser',
        email='testuser@example.com',
        password='testpass123'
    )
    return user

@pytest.fixture
def test_podcast(test_user):
    podcast = Podcast.objects.create(
        user=test_user,
        title='Test Podcast',
        description='This is a test podcast',
        rss_feed_url='https://testpodcast.com/feed.xml',
        category='Technology',
        language='en'
    )
    return podcast

@pytest.fixture
def auth_client(test_user):
    client = APIClient()
    client.force_authenticate(user=test_user)
    return client

def test_list_podcasts(auth_client, test_podcast):
    url = reverse('podcast-list')
    response = auth_client.get(url)
    
    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 1
    assert response.data[0]['title'] == test_podcast.title
    assert response.data[0]['description'] == test_podcast.description

def test_create_podcast(auth_client):
    url = reverse('podcast-list')
    data = {
        'title': 'New Podcast',
        'description': 'A brand new podcast',
        'rss_feed_url': 'https://newpodcast.com/feed.xml',
        'category': 'Education',
        'language': 'en'
    }
    response = auth_client.post(url, data)
    
    assert response.status_code == status.HTTP_201_CREATED
    assert Podcast.objects.filter(title='New Podcast').exists()
    assert response.data['title'] == 'New Podcast'
    assert response.data['description'] == 'A brand new podcast'

def test_retrieve_podcast(auth_client, test_podcast):
    url = reverse('podcast-detail', kwargs={'pk': test_podcast.id})
    response = auth_client.get(url)
    
    assert response.status_code == status.HTTP_200_OK
    assert response.data['title'] == test_podcast.title
    assert response.data['description'] == test_podcast.description

def test_update_podcast(auth_client, test_podcast):
    url = reverse('podcast-detail', kwargs={'pk': test_podcast.id})
    data = {
        'title': 'Updated Podcast Title',
        'description': 'This is an updated description'
    }
    response = auth_client.put(url, data)
    
    assert response.status_code == status.HTTP_200_OK
    test_podcast.refresh_from_db()
    assert test_podcast.title == 'Updated Podcast Title'
    assert test_podcast.description == 'This is an updated description'

def test_delete_podcast(auth_client, test_podcast):
    url = reverse('podcast-detail', kwargs={'pk': test_podcast.id})
    response = auth_client.delete(url)
    
    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert not Podcast.objects.filter(id=test_podcast.id).exists()

def test_unauthorized_access():
    client = APIClient()
    url = reverse('podcast-list')
    
    response = client.get(url)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    data = {'title': 'Unauthorized Podcast', 'description': 'This should not be created'}
    response = client.post(url, data)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    # Assuming a podcast with id 1 exists
    url = reverse('podcast-detail', kwargs={'pk': 1})
    response = client.put(url, {'title': 'Unauthorized Update'})
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    response = client.delete(url)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

# Additional tests can be added here for pagination, filtering, sorting, etc.