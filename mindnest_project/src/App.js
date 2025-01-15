import './App.css';
import '../src/assests/icomoon/style/style.css'
import AccountLayout from './Layout/ApplicationRouters/AccountMain';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext';



function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <AccountLayout />
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;
