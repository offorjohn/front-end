import axios from 'axios';
import { useState, useEffect } from 'react';

const useAxios = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const axiosInstance = axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com/users',
    });

    axiosInstance.interceptors.request.use(
        (config) => config,
        // eslint-disable-next-line no-shadow
        (error) => Promise.reject(error)
    );


    axiosInstance.interceptors.response.use(
        // eslint-disable-next-line no-shadow
        (response) => response,
        // eslint-disable-next-line no-shadow
        (error) => Promise.reject(error)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    let controller = new AbortController()

    useEffect(() => () => controller?.abort(), [controller])



    const fetchData = async ({ url, method, data = {}, params = {} }) => {
        setLoading(true);

        controller.abort()
        controller = new AbortController()

        try {
            const result = await axiosInstance({
                url,
                method,
                data,
                params,
                signal: controller.signal
            });
            setResponse(result.data);
        // eslint-disable-next-line no-shadow
        } catch (error) {
            if (axios.isCancel(error)) {
                console.error("Request cancelled", error.message)

            // Renamed the 'error' variable to 'err'
            } else {
              setError(error.response ? error.response.data : error.message);
           }
         
        } finally {
            setLoading(false);
        }
      };

     return { response, error, loading, fetchData };
    };

export default useAxios;
