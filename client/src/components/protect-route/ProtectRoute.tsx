import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

/// * components
import Router from "../../router/Router";

/// * hooks
import useAuth from "../../hooks/useAuth";

/// * actions
import { UI_ERROR_HANDLER } from "../../store/actions";

const ProtectedRoute = ({}) => {
  /// = y State
  /// y ********************************************************
  const { loading, isAuthorized, error } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /// = + Handlers
  /// + ********************************************************
  const handleLogUnauthorized = useCallback((error: any) => {
    dispatch(UI_ERROR_HANDLER(error));
  }, []);

  /// = ? Cycle
  /// ? ********************************************************
  useEffect(() => {
    if (error) {
      handleLogUnauthorized(error);
      navigate("/login");
    }
  }, [error]);

  if (loading) {
    return <></>;
  } else if (isAuthorized) {
    return <Router />;
  }
};

export default ProtectedRoute;
