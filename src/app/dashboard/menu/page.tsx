"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import AddMenuItemModal from '@/components/AddMenuItemModal';
import { getMenuItems, createMenuItem, MenuItem, CreateMenuItem } from '@/lib/menuService';
import { getRestaurantWithAdmin } from '@/lib/restaurantService';
import styles from '../dashboard.module.css';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  // Fetch restaurant and menu items
  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        setLoading(true);
        try {
          // Get restaurant data
          const restaurantData = await getRestaurantWithAdmin(user.id);
          setRestaurant(restaurantData);

          // Get menu items if restaurant exists
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

  const handleAddItem = async (item: CreateMenuItem) => {
    try {
      const newItem = await createMenuItem(item);
      if (newItem) {
        setMenuItems([newItem, ...menuItems]);
      }
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <DashboardLayout title="Menu Items">
      <div className={styles.content}>
        <div className={styles.menuHeader}>
          <h2>Menu Items</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className={styles.addButton}
          >
            ➕ Add New Item
          </button>
        </div>

        {loading ? (
          <div className={styles.loadingContainer}>
            <p>Loading menu items...</p>
          </div>
        ) : menuItems.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No menu items found. Add your first item to get started!</p>
          </div>
        ) : (
          <div className={styles.menuGrid}>
            {menuItems.map((item) => (
              <div key={item.id} className={styles.menuCard}>
                <div className={styles.menuCardImage}>
                  <img 
                    src={item.picture} 
                    alt={item.name}
                    onError={(e) => {
                      e.currentTarget.src = '/images/smiling_food.png';
                    }}
                  />
                </div>
                <div className={styles.menuCardContent}>
                  <h3 className={styles.menuCardTitle}>{item.name}</h3>
                  {item.description && (
                    <p className={styles.menuCardDescription}>{item.description}</p>
                  )}
                  <p className={styles.menuCardPrice}>{formatPrice(item.price)}</p>
                </div>
                <div className={styles.menuCardActions}>
                  <button className={styles.editButton}>✏️ Edit</button>
                  <button className={styles.deleteButton}>🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AddMenuItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddItem}
        restaurantId={restaurant?.id || ''}
      />
    </DashboardLayout>
  );
} 