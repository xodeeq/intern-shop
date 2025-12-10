import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  full_name?: string;
  created_at?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {
    console.log('🔐 AuthService initialized');
    this.initializeAuth();
  }

  private async initializeAuth() {
    console.log('🔧 Initializing authentication...');
    
    // Check for existing session
    const { data: { user } } = await this.supabase.client.auth.getUser();
    
    if (user) {
      console.log(`✅ Existing session found for: ${user.email}`);
      await this.loadUserProfile(user.id);
    } else {
      console.log('👤 No existing session - user is guest');
    }

    // Listen for auth state changes
    this.supabase.client.auth.onAuthStateChange(async (event, session) => {
      console.log(`🔐 Auth state changed: ${event}`);
      
      if (session?.user) {
        console.log(`👤 User logged in: ${session.user.email}`);
        await this.loadUserProfile(session.user.id);
      } else {
        console.log('👋 User logged out');
        this.currentUserSubject.next(null);
        this.isAuthenticatedSubject.next(false);
      }
    });
  }

  private async loadUserProfile(userId: string) {
    try {
      // Add a small delay to ensure trigger has completed
      await new Promise(resolve => setTimeout(resolve, 500));

      const { data, error } = await this.supabase.client
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('❌ Failed to load user profile:', error);
        
        // If user profile doesn't exist, get basic info from auth
        const { data: { user } } = await this.supabase.client.auth.getUser();
        if (user) {
          const basicUser: User = {
            id: user.id,
            email: user.email!,
            full_name: user.user_metadata?.['full_name']
          };
          this.currentUserSubject.next(basicUser);
          this.isAuthenticatedSubject.next(true);
        }
        return;
      }

      console.log(`✅ User profile loaded: ${data.email}`);
      this.currentUserSubject.next(data);
      this.isAuthenticatedSubject.next(true);
    } catch (error) {
      console.error('💥 Error loading user profile:', error);
    }
  }

  async signUp(email: string, password: string, fullName: string): Promise<AuthResponse> {
    console.log(`📝 Signing up new user: ${email}`);
    
    try {
      // Create auth user - the database trigger will automatically create the profile
      const { data: authData, error: authError } = await this.supabase.client.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (authError) {
        console.error('❌ Signup failed:', authError.message);
        return {
          success: false,
          message: authError.message
        };
      }

      if (!authData.user) {
        return {
          success: false,
          message: 'Failed to create user account'
        };
      }

      console.log(`✅ Auth user created: ${authData.user.id}`);
      console.log('⏳ User profile will be created automatically by database trigger');

      // If there's a session, load the user profile
      if (authData.session) {
        console.log('✅ User automatically logged in');
        await this.loadUserProfile(authData.user.id);
        
        return {
          success: true,
          message: '✅ Account created successfully! Welcome aboard!',
          user: {
            id: authData.user.id,
            email: email,
            full_name: fullName
          }
        };
      } else {
        // Email confirmation required
        console.log('📧 Email confirmation required');
        return {
          success: true,
          message: '📧 Please check your email to verify your account before logging in.',
          user: {
            id: authData.user.id,
            email: email,
            full_name: fullName
          }
        };
      }
    } catch (error: any) {
      console.error('💥 Unexpected signup error:', error);
      return {
        success: false,
        message: 'An unexpected error occurred. Please try again.'
      };
    }
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    console.log(`🔑 Signing in user: ${email}`);
    
    try {
      const { data, error } = await this.supabase.client.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('❌ Login failed:', error.message);
        return {
          success: false,
          message: error.message === 'Invalid login credentials' 
            ? '❌ Invalid email or password' 
            : error.message
        };
      }

      if (!data.user) {
        return {
          success: false,
          message: 'Login failed. Please try again.'
        };
      }

      console.log(`✅ User logged in: ${data.user.email}`);
      await this.loadUserProfile(data.user.id);

      // Check for redirect URL
      const redirectUrl = localStorage.getItem('redirectUrl');
      if (redirectUrl) {
        console.log(`🔄 Redirecting to: ${redirectUrl}`);
        localStorage.removeItem('redirectUrl');
        setTimeout(() => {
          this.router.navigate([redirectUrl]);
        }, 1000);
      }

      return {
        success: true,
        message: '✅ Welcome back!',
        user: {
          id: data.user.id,
          email: data.user.email!,
          full_name: data.user.user_metadata?.['full_name']
        }
      };
    } catch (error: any) {
      console.error('💥 Unexpected login error:', error);
      return {
        success: false,
        message: 'An unexpected error occurred. Please try again.'
      };
    }
  }

  async signOut(): Promise<void> {
    console.log('👋 Signing out user...');
    
    try {
      const { error } = await this.supabase.client.auth.signOut();
      
      if (error) {
        console.error('❌ Signout failed:', error);
        throw error;
      }

      console.log('✅ User signed out successfully');
      this.currentUserSubject.next(null);
      this.isAuthenticatedSubject.next(false);
      
      // Clear any stored data
      localStorage.removeItem('cart');
      localStorage.removeItem('likes');
      
      // Redirect to login
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('💥 Error signing out:', error);
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Helper method to check auth before actions
  requireAuth(actionName: string = 'perform this action'): boolean {
    if (!this.isAuthenticated()) {
      alert(`⚠️ Please login to ${actionName}`);
      
      // Store current URL for redirect after login
      const currentUrl = this.router.url;
      if (currentUrl !== '/login' && currentUrl !== '/register') {
        localStorage.setItem('redirectUrl', currentUrl);
      }
      
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}