import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UI_SOCKET_START, UI_SEND_TEST_REQUEST } from "../../store/actions";

const ReduxProviderDispatchers = () => {
  /// y *****************************************
  const dispatch = useDispatch();

  /// ? *****************************************
  useEffect(() => {
    dispatch(UI_SEND_TEST_REQUEST());
    dispatch(UI_SOCKET_START());
  }, []);

  return null;
};

export default ReduxProviderDispatchers;
