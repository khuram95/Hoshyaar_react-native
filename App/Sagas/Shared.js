import { isEmpty, get } from 'lodash'
import { AsyncStorage } from 'react-native'

export function parseError(response) {
  let error = get(response, 'data.meta.message')
  if (response.problem === 'NETWORK_ERROR' || response.problem === 'SERVER_ERROR')
    error = 'Backend server is down.'
  return error
}

export const getAuthHeaders = async () => {
  const user = await AsyncStorage.getItem('currentUser')
  const userData = JSON.parse(user);
  return {
    'access-token': userData.accessToken,
    uid: userData.uid,
    client: userData.client,
  }
}

export const saveUserToLocalStorage = async (user) => {
    return await user ? AsyncStorage.setItem('currentUser', JSON.stringify(user)) : {};
}

export const removeUserFromLocalStorage = async (user) => {
  return await AsyncStorage.setItem('currentUser', '{}');
}
