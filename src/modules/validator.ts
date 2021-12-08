import { objectLiteral } from "../interfaces";

export const emailRegex: RegExp =
  /^[A-Za-z0-9.-_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

export const nameRegex: RegExp = /^[A-Za-z]+\s([A-Za-z]+\s)?[A-Za-z]+$/;

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
  regex: RegExp,
  regexType: string
): any => {
  let errorMessage: string = "";

  if (typeof value !== "number") {
    if (!value) return null;
  }

  return;
};

export const errorChecker = (payload: objectLiteral): string[] | null => {
  const result: any = {};

  Object.keys(payload).forEach((key) => {
    if (payload[key]) {
      result[key] = payload[key];
    }

    if (payload[key] === null) {
      result[key] = `${key} is required`;
    }
  });

  return Object.keys(result).length ? result : null;
};
