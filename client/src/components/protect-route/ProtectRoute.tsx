import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

/// * components
import Router from "../../router/Router";

/// * hooks
import useAuth from "../../hooks/useAuth";

/// * actions
import { USER_ERROR } from "../../store/actions";

const ProtectedRoute = ({}) => {
  /// = y State
  /// y ********************************************************
  const { loading, isAuthorized, error } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /// = + Handlers
  /// + ********************************************************
  const handleLogUnauthorized = useCallback((error: any) => {
    dispatch(USER_ERROR(error.message));
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
