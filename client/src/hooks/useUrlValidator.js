const useUrlValidator = (url) => {
  const validateUrl = (inputUrl) => {
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/i;
    return urlPattern.test(inputUrl);
  };

  const isUrlValid = validateUrl(url);

  return { isUrlValid };
};

export default useUrlValidator;
