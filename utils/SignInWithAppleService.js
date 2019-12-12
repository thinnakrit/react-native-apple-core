import urljoin from 'url-join'

export const create = ({
  response_type,
  response_mode,
  client_id,
  redirect_uri,
  state,
}) => {
  const uri = urljoin(
    'https://appleid.apple.com/auth/authorize',
    `?response_type=${response_type}&response_mode=${response_mode}&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}`
  )
  return uri
}

export default {
  create
}