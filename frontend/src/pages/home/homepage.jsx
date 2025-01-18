import { useAuthStore } from "../../store/AuthUser.js"

import HomeScreen from "./HomeScreen.jsx"
import AuthScreen from "./AuthScreen.jsx"

const HomePage = () => {
  const { user } = useAuthStore();
  
  return <div>
    { user ? <HomeScreen /> : <AuthScreen /> }
    <pre>
      {JSON.stringify(user, null, 2) }
    </pre>
  </div>
}

export default HomePage;