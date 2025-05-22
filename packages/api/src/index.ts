import { fetchDashboard } from './dashboard';

async function getServerAuthToken(): Promise<string | null> {
  if (typeof window !== 'undefined') {
    try {
      const sessionTokenMatch = document.cookie.match(/session-token=([^;]+)/);
      return sessionTokenMatch ? decodeURIComponent(sessionTokenMatch[1]) : null;
    } catch {
      return null;
    }
  }

  try {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session-token')?.value;
    return sessionToken || null;
  } catch (error) {
    return null;
  }
}

export async function fetchPageData(slug: string) {
  try {
    const token = await getServerAuthToken();

    console.log(`🔍 Fetching page data for: ${slug}`);
    console.log(`🔑 Auth token: ${token ? 'present' : 'none'}`);

    if (slug === 'home' || slug === '' || !slug) {
      if (token) {
        try {
          const dashboardPromise = fetchDashboard(token);
          const timeoutPromise = new Promise<null>((_, reject) =>
            setTimeout(() => reject(new Error('Dashboard API timeout')), 5000)
          );

          const dashboardData = await Promise.race([dashboardPromise, timeoutPromise]);

          if (dashboardData) {
            console.log('✅ Home page - Real dashboard data received');
            return {
              type: 'home',
              realApiData: dashboardData
            };
          }
        } catch (error) {
          console.warn('Dashboard API failed for home, using fallback:');
        }
      }

      return {
        type: 'home',
        realApiData: null
      };
    }

    if (slug === 'videos') {
      if (token) {
        try {
          const dashboardPromise = fetchDashboard(token);
          const timeoutPromise = new Promise<null>((_, reject) =>
            setTimeout(() => reject(new Error('Dashboard API timeout')), 5000)
          );

          const dashboardData = await Promise.race([dashboardPromise, timeoutPromise]);

          if (dashboardData) {
            console.log('✅ Videos page - Real dashboard data received');
            return {
              type: 'videos',
              realApiData: dashboardData
            };
          }
        } catch (error) {
          console.warn('Dashboard API failed for videos, using fallback:');
        }
      }
      console.log('📝 Videos page - Using empty fallback');
      return {
        type: 'videos',
        realApiData: null
      };
    }

    console.log(`❌ Unknown slug: ${slug}`);
    return { type: 'not_found' };

  } catch (error) {
    console.error('API Error:', error);
    return { type: 'not_found' };
  }
}

export { fetchDashboard, getMockDashboardData, clearDashboardCache } from './dashboard';
export { myVideoApiClient } from './myvideo-client';