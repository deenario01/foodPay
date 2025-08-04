"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { getRestaurantWithAdmin } from '@/lib/restaurantService';
import { getMenuItems } from '@/lib/menuService';
import styles from '../dashboard.module.css';

interface WebsiteSettings {
  bannerImage: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  showCategories: boolean;
  layoutStyle: 'grid' | 'list' | 'cards';
}

export default function WebsitePage() {
  const [restaurant, setRestaurant] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<WebsiteSettings>({
    bannerImage: '',
    primaryColor: '#1f2937',
    secondaryColor: '#f3f4f6',
    accentColor: '#10b981',
    fontFamily: 'Inter',
    showCategories: true,
    layoutStyle: 'grid'
  });
  const { user } = useAuth();

  // Fetch restaurant and menu data
  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        setLoading(true);
        try {
          const restaurantData = await getRestaurantWithAdmin(user.id);
          setRestaurant(restaurantData);

          if (restaurantData?.id) {
            const items = await getMenuItems(restaurantData.id);
            setMenuItems(items);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  const handleSettingChange = (key: keyof WebsiteSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    // TODO: Save settings to database
    console.log('Saving website settings:', settings);
    alert('Website settings saved!');
  };

  const generateWebsitePreview = () => {
    return (
      <div className={styles.websitePreview}>
        <div className={styles.previewHeader}>
          <h3>Website Preview</h3>
          <button className={styles.previewButton}>View Live Site</button>
        </div>
        <div 
          className={styles.previewFrame}
          style={{
            '--primary-color': settings.primaryColor,
            '--secondary-color': settings.secondaryColor,
            '--accent-color': settings.accentColor,
            '--font-family': settings.fontFamily
          } as React.CSSProperties}
        >
          {/* Banner */}
          {settings.bannerImage && (
            <div className={styles.previewBanner}>
              <img src={settings.bannerImage} alt="Restaurant Banner" />
            </div>
          )}
          
          {/* Restaurant Info */}
          <div className={styles.previewRestaurantInfo}>
            <h1>{restaurant?.name || 'Restaurant Name'}</h1>
            <p>{restaurant?.description || 'Restaurant description'}</p>
          </div>
          
          {/* Menu Categories */}
          {settings.showCategories && (
            <div className={styles.previewCategories}>
              <h2>Menu Categories</h2>
              <div className={styles.previewCategoryList}>
                <span className={styles.previewCategory}>Appetizers</span>
                <span className={styles.previewCategory}>Main Course</span>
                <span className={styles.previewCategory}>Desserts</span>
                <span className={styles.previewCategory}>Beverages</span>
              </div>
            </div>
          )}
          
          {/* Sample Menu Items */}
          <div className={styles.previewMenuItems}>
            <h2>Featured Items</h2>
            <div className={`${styles.previewMenuGrid} ${styles[`layout-${settings.layoutStyle}`]}`}>
              {menuItems.slice(0, 3).map((item, index) => (
                <div key={index} className={styles.previewMenuItem}>
                  <img src={item.picture} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout title="Website Settings">
      <div className={styles.content}>
        <div className={styles.websiteHeader}>
          <h2>Website Template Settings</h2>
          <button onClick={handleSaveSettings} className={styles.saveButton}>
            💾 Save Settings
          </button>
        </div>

        <div className={styles.websiteLayout}>
          {/* Settings Panel */}
          <div className={styles.settingsPanel}>
            <h3>Customization Options</h3>
            
            {/* Banner Settings */}
            <div className={styles.settingGroup}>
              <h4>Banner Image</h4>
              <input
                type="url"
                placeholder="Enter banner image URL"
                value={settings.bannerImage}
                onChange={(e) => handleSettingChange('bannerImage', e.target.value)}
                className={styles.settingInput}
              />
            </div>

            {/* Color Theme */}
            <div className={styles.settingGroup}>
              <h4>Color Theme</h4>
              <div className={styles.colorInputs}>
                <div className={styles.colorInput}>
                  <label>Primary Color</label>
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                    className={styles.colorPicker}
                  />
                </div>
                <div className={styles.colorInput}>
                  <label>Secondary Color</label>
                  <input
                    type="color"
                    value={settings.secondaryColor}
                    onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
                    className={styles.colorPicker}
                  />
                </div>
                <div className={styles.colorInput}>
                  <label>Accent Color</label>
                  <input
                    type="color"
                    value={settings.accentColor}
                    onChange={(e) => handleSettingChange('accentColor', e.target.value)}
                    className={styles.colorPicker}
                  />
                </div>
              </div>
            </div>

            {/* Font Settings */}
            <div className={styles.settingGroup}>
              <h4>Typography</h4>
              <select
                value={settings.fontFamily}
                onChange={(e) => handleSettingChange('fontFamily', e.target.value)}
                className={styles.settingSelect}
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Poppins">Poppins</option>
                <option value="Montserrat">Montserrat</option>
              </select>
            </div>

            {/* Layout Settings */}
            <div className={styles.settingGroup}>
              <h4>Menu Layout</h4>
              <div className={styles.layoutOptions}>
                <label className={styles.layoutOption}>
                  <input
                    type="radio"
                    name="layout"
                    value="grid"
                    checked={settings.layoutStyle === 'grid'}
                    onChange={(e) => handleSettingChange('layoutStyle', e.target.value)}
                  />
                  <span>Grid Layout</span>
                </label>
                <label className={styles.layoutOption}>
                  <input
                    type="radio"
                    name="layout"
                    value="list"
                    checked={settings.layoutStyle === 'list'}
                    onChange={(e) => handleSettingChange('layoutStyle', e.target.value)}
                  />
                  <span>List Layout</span>
                </label>
                <label className={styles.layoutOption}>
                  <input
                    type="radio"
                    name="layout"
                    value="cards"
                    checked={settings.layoutStyle === 'cards'}
                    onChange={(e) => handleSettingChange('layoutStyle', e.target.value)}
                  />
                  <span>Card Layout</span>
                </label>
              </div>
            </div>

            {/* Display Options */}
            <div className={styles.settingGroup}>
              <h4>Display Options</h4>
              <label className={styles.checkboxOption}>
                <input
                  type="checkbox"
                  checked={settings.showCategories}
                  onChange={(e) => handleSettingChange('showCategories', e.target.checked)}
                />
                <span>Show Menu Categories</span>
              </label>
            </div>
          </div>

          {/* Website Preview */}
          <div className={styles.previewSection}>
            {generateWebsitePreview()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 