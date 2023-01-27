export const fetcher = async (...args) => {
  const res = await fetch(...args, {});
  let payload;
  try {
    if (res.status === 204) return null; // 204 does not have body
    payload = await res.json();
  } catch (error) {
    throw new Error(error.message || "api call failed");
  }
  if (res.ok) {
    return payload;
  } else {
    return Promise.reject(payload.error || new Error("Fetch went wrong"));
  }
};

export const postReq = async ({ url, body }) => {
  console.log(url, body);
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  let data;

  try {
    data = await res.json();
  } catch (error) {
    throw new Error(error.message || "api post call failed");
  }

  if (res.ok) {
    return await data;
  }
};
