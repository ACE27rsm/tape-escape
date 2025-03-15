const castStringToBoolean = function (
  value: string | number | boolean | undefined
): boolean {
  const input = String(value).toLowerCase();

  if (
    input === "" ||
    input === "false" ||
    input === "0" ||
    input === "null" ||
    input === "undefined"
  ) {
    return false;
  }

  return true;
};

export default castStringToBoolean;
