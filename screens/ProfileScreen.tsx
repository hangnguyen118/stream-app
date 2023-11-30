import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useAuth } from '../AuthContext';
import config from '../apiconfig';

const ProfileScreen = () => {
  const { state, dispatch } = useAuth();
  const handleLogout = async () => {
    try {
      const response = await fetch(config.API_URL+'/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        console.log('Logout successful');
        dispatch({ type: 'LOGOUT' });
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
    
  return (
    <View>
      {state.isAuthenticated ? (
        <>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Please login to view your profile.</Text>
      )}
    </View>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
  logout: {
      fontWeight: "500",
      fontSize: 24
  },
})