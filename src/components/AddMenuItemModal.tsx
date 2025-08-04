"use client";

import { useState } from 'react';
import { CreateMenuItem } from '@/lib/menuService';
import styles from '../app/dashboard/dashboard.module.css';

interface AddMenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: CreateMenuItem) => Promise<void>;
  restaurantId: string;
}

export default function AddMenuItemModal({ isOpen, onClose, onSubmit, restaurantId }: AddMenuItemModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    picture: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const item: CreateMenuItem = {
        name: formData.name,
        price: parseFloat(formData.price),
        picture: formData.picture,
        description: formData.description || undefined,
        restaurant_id: restaurantId
      };

      await onSubmit(item);
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        picture: '',
        description: ''
      });
      
      onClose();
    } catch (error) {
      console.error('Error adding menu item:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Add New Menu Item</h2>
          <button onClick={onClose} className={styles.modalClose}>
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Item Name *</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className={styles.formInput}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="price">Price *</label>
            <input
              type="number"
              id="price"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              className={styles.formInput}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="picture">Image URL *</label>
            <input
              type="url"
              id="picture"
              value={formData.picture}
              onChange={(e) => setFormData({ ...formData, picture: e.target.value })}
              required
              className={styles.formInput}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={styles.formTextarea}
              rows={3}
              placeholder="Optional description of the item..."
            />
          </div>
          
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.modalCancel}>
              Cancel
            </button>
            <button type="submit" disabled={loading} className={styles.modalSubmit}>
              {loading ? 'Adding...' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 