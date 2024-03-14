import { User } from "../Types/User";
import { getCookie } from "typescript-cookie";

const checkToken = async () => {
  const token = getCookie('token');
    const checkTokenQuery = `
    query {checkToken {
      message
      user {
        username
        email
        id
        isFollowing {
          name
        }
      }
    }}`;

    const request = await fetch('https://web2-back.azurewebsites.net/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      body: JSON.stringify({ query: checkTokenQuery }),
    });
    const response = await request.json();
    const user = response.data.checkToken.user as User;
    return user;
}

const getUserId = async () => {
  const user = await checkToken();
  return user.id;
}

export default checkToken;
export { getUserId };
