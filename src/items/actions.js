import axios from 'axios';

import { API_URL_BASE } from '../constants';

export function useQuality(id) {
  return (dispatch) => {
    axios.post(`${API_URL_BASE}/api/storylet/usequality/${id}`);
  };
}
