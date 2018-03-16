import axios from 'axios';

export function useQuality(id) {
  return (dispatch) => {
    axios.post(`https://api.fallenlondon.com/api/storylet/usequality/${id}`);
  };
}
