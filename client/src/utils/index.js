const sanitizeString = (string) => {
  return string.replace(/\s/g, "").toLowerCase();
};

export { sanitizeString };
