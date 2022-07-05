import { useLocation } from 'react-router-dom';

export default function useQuery() {
  const params = useLocation()?.search?.split('&').reduce((o, v) => {
    const kv = v.split('=');
    const key = kv[0].replace('?', '');
    const value = kv[1];
    // eslint-disable-next-line no-param-reassign
    o[key] = value;
    return o;
  },
  {});

  const get = (key) => params[key];

  return { get };
}
