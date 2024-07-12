import BASE_URL from "./api";

const apiFetch = async (url, options) => {
  const response = await fetch(BASE_URL + url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
  if (!response.ok) {
    return Promise.reject(response);
  }
  return await response.json();
};

export const getCandidates = () => {
  return apiFetch("/", {
    method: "GET",
  });
};

export const saveCandidate = (candidate) => {
  return apiFetch("/save", {
    method: "POST",
    body: JSON.stringify(candidate),
  });
};

export const deleteCandidate = (candidate) => {
  return apiFetch("/delete", {
    method: "DELETE",
    body: JSON.stringify(candidate),
  });
};

export const editCandidate = (candidate) => {
  return apiFetch("/edit", {
    method: "PATCH",
    body: JSON.stringify(candidate),
  });
};
