import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post('/api/auth/logout');
        router.push('/auth/login');
      } catch (err) {
        console.error('An error occurred during logout:', err);
      }
    };

    logout();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Logging out...</h2>
      </div>
    </div>
  );
};

export default Logout;
