/* eslint-disable no-param-reassign */

export default function unsetAuthHeader({ axios }) {
  delete axios.defaults.headers.common.Authorization;
}
