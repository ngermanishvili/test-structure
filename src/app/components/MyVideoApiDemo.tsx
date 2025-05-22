'use client';
import { AuthGuard, useAuth, LoginForm, getClientApiToken } from '@myvideo/authenticator/client';
import { useState, useEffect } from 'react';

export default function DashboardTestPage() {
  return (
    <div className="container mx-auto py-8">
      <AuthGuard
        fallback={
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6">Dashboard Test - ავტორიზაცია საჭიროა</h1>
            <LoginForm />
          </div>
        }
      >
        <DashboardTest />
      </AuthGuard>
    </div>
  );
}

function DashboardTest() {
  const { user, logout, isAuthenticated } = useAuth();
  // ✅ Fix any type
  const [dashboardData, setDashboardData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const token = getClientApiToken();
      if (token) {
        import('@myvideo/api/src/myvideo-client').then(({ myVideoApiClient }) => {
          myVideoApiClient.setToken(token);
          console.log('🔄 Test page: API token synced');
        });
      }
    }
  }, [isAuthenticated]);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);

    try {
      const { myVideoApiClient } = await import('@myvideo/api/src/myvideo-client');

      const token = getClientApiToken();
      if (token) {
        myVideoApiClient.setToken(token);
        console.log('🔑 Token set for API call:', token.substring(0, 20) + '...');
      } else {
        throw new Error('No API token found');
      }

      console.log('🧪 Testing /dashboard/mobile/main endpoint...');
      const response = await myVideoApiClient.get('/dashboard/mobile/main');

      console.log('✅ Dashboard response:', response);
      setDashboardData(response as Record<string, unknown>);

    } catch (err) {
      // ✅ Fix any type
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('❌ Dashboard failed:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">📊 Dashboard Test</h1>
            <p className="text-gray-600">User: {user?.email}</p>
            <p className="text-sm text-gray-500">
              Auth Status: {isAuthenticated ? '✅ Authenticated' : '❌ Not Authenticated'}
            </p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            გასვლა
          </button>
        </div>
      </div>

      {/* Cookie Debug Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-bold text-yellow-800 mb-2">🔍 Debug Info:</h3>
        <div className="text-sm">
          <p><strong>Cookies:</strong> {document.cookie || 'None'}</p>
          <p><strong>API Token:</strong> {getClientApiToken()?.substring(0, 20) + '...' || 'None'}</p>
          <p><strong>User Info:</strong> {document.cookie.match(/user-info=([^;]+)/)?.[1] ? 'Present' : 'None'}</p>
        </div>
      </div>

      {/* Test Button */}
      <div className="bg-white shadow rounded-lg p-6">
        <button
          onClick={fetchDashboard}
          disabled={loading || !isAuthenticated}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? '⏳ Loading...' : '📊 Fetch Dashboard'}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-red-800"><strong>Error:</strong> {error}</p>
          </div>
        )}
      </div>

      {/* Dashboard Data */}
      {dashboardData && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📊 Dashboard Data</h2>
          <div className="bg-gray-50 rounded p-4 overflow-auto max-h-96">
            <pre className="text-sm">{JSON.stringify(dashboardData, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}