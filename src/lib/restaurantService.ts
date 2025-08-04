import { supabase } from './supabase';

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface RestaurantAdmin {
  id: string;
  user_id: string;
  restaurant_id: string;
  created_at: string;
}

export async function getRestaurantForUser(userId: string): Promise<Restaurant | null> {
  try {
    // First, get the restaurant_admin record for this user
    const { data: adminData, error: adminError } = await supabase
      .from('restaurant_admins')
      .select('restaurant_id')
      .eq('user_id', userId)
      .single();

    if (adminError) {
      console.error('Error fetching restaurant admin:', adminError);
      return null;
    }

    if (!adminData) {
      console.log('No restaurant admin found for user:', userId);
      return null;
    }

    // Then, get the restaurant details using the restaurant_id
    const { data: restaurantData, error: restaurantError } = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', adminData.restaurant_id)
      .single();

    if (restaurantError) {
      console.error('Error fetching restaurant:', restaurantError);
      return null;
    }

    return restaurantData;
  } catch (error) {
    console.error('Error in getRestaurantForUser:', error);
    return null;
  }
}

export async function getRestaurantWithAdmin(userId: string): Promise<Restaurant | null> {
  try {
    // Get restaurant admin and restaurant details in one query using joins
    const { data, error } = await supabase
      .from('restaurant_admins')
      .select(`
        restaurant_id,
        restaurants (
          id,
          name,
          description,
          created_at,
          updated_at
        )
      `)
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching restaurant with admin:', error);
      return null;
    }
      
      console.log("DATA: ", data.restaurants);

    // The restaurants field is nested, so we need to access it properly
    if (data?.restaurants) {
      return data.restaurants as unknown as Restaurant;
    }
    return null;
  } catch (error) {
    console.error('Error in getRestaurantWithAdmin:', error);
    return null;
  }
} 