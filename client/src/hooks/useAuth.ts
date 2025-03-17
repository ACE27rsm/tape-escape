import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

/// * actions
import { USER_LOGIN_TASKS } from "../store/actions";

/// * libs
import Axios from "../libs/Axios";

const useAuth = () => {
  /// = y State
  /// y ****************************************************************************
  const dispatch = useDispatch();
  const [stateAuth, setStateAuth] = useState({
    isAuthorized: false,
    loading: false,
    error: null,
    loginingIn: false,
  });

  /// = ? Cycle
  /// ? ****************************************************************************
  /// ? Effect iniziale dove controllo le autenticazioni
  useEffect(() => {
    /// ? setto il loading
    setStateAuth((prevState) => ({ ...prevState, loading: true }));
    Axios.get("/auth/validate")
      .then(({ data: user }) => {
        dispatch(USER_LOGIN_TASKS(user));

        setStateAuth((prevState) => ({
          ...prevState,
          loading: false,
          isAuthorized: true,
          error: null,
        }));
      })
      .catch((err) => {
        console.error(err);
        setStateAuth((prevState) => ({
          ...prevState,
          loading: false,
          isAuthorized: false,
          error: err,
        }));
      });
  }, []);

  return stateAuth;
};

export default useAuth;
