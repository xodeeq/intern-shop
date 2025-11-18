import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    console.log('🔧 Initializing Supabase Service...');
    console.log('📍 Supabase URL:', environment.supabaseUrl);
    console.log('🔑 API Key configured:', !!environment.supabaseKey);

    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    console.log('✅ Supabase client created successfully');
    
    // Test the connection
    this.testConnection();
  }

  get client() {
    return this.supabase;
  }

  private async testConnection() {
    try {
      console.log('🔍 Testing Supabase connection...');
      
      // Try to fetch from products table
      const { data, error, count } = await this.supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('❌ Supabase connection test failed:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint
        });
      } else {
        console.log('✅ Supabase connection successful!');
        console.log(`📦 Products table accessible (${count || 0} records)`);
      }

      // Test auth state
      const { data: { user } } = await this.supabase.auth.getUser();
      console.log('👤 Current user:', user ? `Logged in as ${user.email}` : 'Guest user');

    } catch (error) {
      console.error('💥 Unexpected error testing Supabase connection:', error);
    }
  }
}