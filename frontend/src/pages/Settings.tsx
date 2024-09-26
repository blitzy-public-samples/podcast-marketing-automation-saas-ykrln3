import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../hooks/useSettings';
import Tab from '../components/common/Tab';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Switch from '../components/common/Switch';
import AccountSettings from '../components/settings/AccountSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import IntegrationSettings from '../components/settings/IntegrationSettings';
import BillingSettings from '../components/settings/BillingSettings';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');
  const { user } = useAuth();
  const { settings, fetchSettings, updateSettings, loading, error } = useSettings();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSave = async (updatedSettings: any) => {
    try {
      await updateSettings(updatedSettings);
      // Show success message
    } catch (error) {
      // Show error message
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <Card>
        <Tab
          tabs={[
            { id: 'account', label: 'Account' },
            { id: 'notifications', label: 'Notifications' },
            { id: 'integrations', label: 'Integrations' },
            { id: 'billing', label: 'Billing' },
          ]}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        <div className="tab-content">
          {activeTab === 'account' && (
            <AccountSettings
              user={user}
              settings={settings}
              onSave={handleSave}
            />
          )}
          {activeTab === 'notifications' && (
            <NotificationSettings
              settings={settings}
              onSave={handleSave}
            />
          )}
          {activeTab === 'integrations' && (
            <IntegrationSettings
              settings={settings}
              onSave={handleSave}
            />
          )}
          {activeTab === 'billing' && (
            <BillingSettings
              settings={settings}
              onSave={handleSave}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default Settings;