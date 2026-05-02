let token: string | null = null;

export const setToken = (t: string) => {
  token = t;
};

export const apiClient = async (url: string, options: any = {}) => {
  const res = await fetch("https://gateway.uptoskills.com/api" + url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  const text = await res.text();
  console.log("RAW RESPONSE:", text);

  return res.json();
};