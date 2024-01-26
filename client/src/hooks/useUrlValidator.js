const useUrlValidator = (url) => {
  const validateUrl = (inputUrl) => {
    if (!inputUrl.trim()) {
      return false;
    }

    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w- ./?%&=]*)?$/i;
    return urlPattern.test(inputUrl);
  };

  const isUrlValid = validateUrl(url);

  return { isUrlValid };
};

export default useUrlValidator;