import { supabase } from './supabase';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  picture: string;
  description?: string;
  restaurant_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateMenuItem {
  name: string;
  price: number;
  picture: string;
  description?: string;
  restaurant_id: string;
}

export async function getMenuItems(restaurantId: string): Promise<MenuItem[]> {
  try {
    const { data, error } = await supabase
      .from('menu')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching menu items:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getMenuItems:', error);
    return [];
  }
}

export async function createMenuItem(item: CreateMenuItem): Promise<MenuItem | null> {
  try {
    const { data, error } = await supabase
      .from('menu')
      .insert([item])
      .select()
      .single();

    if (error) {
      console.error('Error creating menu item:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in createMenuItem:', error);
    return null;
  }
}

export async function updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<MenuItem | null> {
  try {
    const { data, error } = await supabase
      .from('menu')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating menu item:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in updateMenuItem:', error);
    return null;
  }
}

export async function deleteMenuItem(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('menu')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting menu item:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteMenuItem:', error);
    return false;
  }
} 