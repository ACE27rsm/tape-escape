import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

/// * lib
import Axios from "../libs/Axios";

function useFetch(url: string, config: AxiosRequestConfig = {}) {
  /// y *************************************************************
  const [stateData, setStateData] = useState<any>(null);
  const [stateFetching, setStateFetching] = useState<boolean>(false);
  const [stateError, setStateError] = useState<any>(null);
  const [stateProgress, setStateProgress] = useState<number>(0);

  /// ? *************************************************************
  useEffect(() => {
    const source = axios.CancelToken.source();
    if (url) {
      setStateFetching(true);
      setStateData(null);
      setStateError(null);
      setStateProgress(0);
      Axios.get(url, {
        cancelToken: source.token,
        onDownloadProgress: (progressEvent) => {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent?.total || 1)
          );
          setStateProgress(percentCompleted);
        },

        ...config,
      })
        .then((res) => {
          setStateFetching(false);

          setStateData(res.data);
        })
        .catch((err) => {
          setStateFetching(false);
          setStateError(err);
        });
    }
    return () => {
      source.cancel();
    };
  }, [url]);

  return {
    data: stateData,
    fetching: stateFetching,
    error: stateError,
    progress: stateProgress,
  };
}

export default useFetch;
