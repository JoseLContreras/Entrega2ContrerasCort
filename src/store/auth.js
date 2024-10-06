import { useReducer } from 'react';
import { toast } from 'react-toastify';
import {
  setExpirationDate,
  getUserFromLocalStorage,
} from '../helpers/checkExpiration';

const initialState = {
  user: getUserFromLocalStorage() || null,
};
const actions = Object.freeze({
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
});

const reducer = (state, action) => {
  if (action.type == actions.SET_USER) {
    return { ...state, user: action.user };
  }
  if (action.type == actions.LOGOUT) {
    return { ...state, user: null };
  }
  return state;
};

const useAuth = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const register = async (userInfo) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(userInfo),
      });

      const user = await response.json();
      if (user.error) {
        toast.error(user.error);
      }
      if (user.user) {
        dispatch({ type: actions.SET_USER, user: user.user });
        user.user.expirationDate = setExpirationDate(7);
        localStorage.setItem('usuario', JSON.stringify(user.user));
        toast.success('Se ha registrado exitosamente');
        // login user
      }
    } catch (error) {
      toast.error('Hubo un problema al registrarse, inténtalo nuevamente');
    }
  };

  const login = async (userInfo) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(userInfo),
      });
      const user = await response.json();
      if (user.error) {
        toast.error(user.error);
      }
      if (user.user) {
        dispatch({ type: actions.SET_USER, user: user.user });
        user.user.expirationDate = setExpirationDate(7);
        localStorage.setItem('usuario', JSON.stringify(user.user));
        toast.success('Login exitoso');
      }
    } catch (error) {
      toast.error('Hubo un problema al iniciar sesión, inténtalo nuevamente');
    }
  };

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
    });
    localStorage.removeItem('usuario');
    dispatch({ type: actions.LOGOUT });
  };

  return { state, register, login, logout };
};

export default useAuth;
