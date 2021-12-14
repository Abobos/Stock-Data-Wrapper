import { objectLiteral } from "../interfaces";

export const nameRegex: RegExp = /^[A-Za-z]+$/;

export const dateRegex: RegExp =
  /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

export const magicTrimmer = (payload: objectLiteral): objectLiteral => {
  const data = {};

  Object.keys(payload).forEach((key) => {
    const value: any = payload[key];

    Object.assign(data, {
      [key]: typeof value !== "string" ? value : value.trim(),
    });
  });

  return data;
};

export const validateAgainstRegex = (
  value: string,
  regexType: string,
  regex?: RegExp
): any => {
  let errorMessage: string = "";

  if (regex) {
    if (!regex.test(value)) errorMessage = `${regexType} is not valid`;
  } else {
    if (!Boolean(Number(value))) {
      errorMessage = `${regexType} is not valid`;
    }
  }

  return errorMessage;
};

export const errorChecker = (payload: objectLiteral): string[] | null => {
  const result: any = {};

  Object.keys(payload).forEach((key) => {
    if (payload[key]) {
      result[key] = payload[key];
    }
  });

  return Object.keys(result).length ? result : null;
};
