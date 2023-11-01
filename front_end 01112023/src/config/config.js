export const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("smitoken")}`,
  },
};

export const config1 = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("smitoken")}`,
    "Content-Type": "multipart/form-data",
  },
};
