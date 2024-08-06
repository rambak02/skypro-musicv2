const baseUrl = "https://webdev-music-003b5b991590.herokuapp.com";
type AuthUserType = {
  email: string;
  password: string;
  username: string;
};
type LoginUserType = {
  email: string;
  password: string;
};
type LikesType = {
  access: string;
  id: number;
};
export async function authUser({ email, password, username }: AuthUserType) {
  const response = await fetch(baseUrl + "/user/signup/", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      username,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
}
export async function loginUser({ email, password }: LoginUserType) {
  const response = await fetch(baseUrl + "/user/login/", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
}

export async function fetchToken({ email, password }: LoginUserType) {
  const response = await fetch(baseUrl + "/user/token/", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
}

export async function fetchFavoriteTracks(access: string) {
  const response = await fetch(baseUrl +
    "/catalog/track/favorite/all/",
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await response.json();
  return data.data;
}

export async function addLike({ access, id }: LikesType) {
  const response = await fetch(baseUrl +
    `/catalog/track/${id}/favorite/`,
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      method: "POST",
      body: JSON.stringify({
        id,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return response.json();
}

export async function removeLike({ access, id }: LikesType) {
  const response = await fetch(baseUrl +
    `/catalog/track/${id}/favorite/`,
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      method: "DELETE",
      body: JSON.stringify({
        id,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return response.json();
}
