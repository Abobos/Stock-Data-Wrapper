import { ObjectProps } from "@services/types";

export const getOnlyValueFromQueryData = (
  queryParamsValue: ObjectProps | string
): string => {
  if (typeof queryParamsValue === "object") {
    return queryParamsValue["lte"] ?? queryParamsValue["gte"];
  } else {
    return queryParamsValue;
  }
};

export const getValueAndOperator = (
  queryParamsValue: any
): { value: string; operator: string } => {
  if (typeof queryParamsValue === "object") {
    if (queryParamsValue["lte"]) {
      return { value: queryParamsValue, operator: "lte" };
    }

    if (queryParamsValue["gte"]) {
      return { value: queryParamsValue, operator: "gte" };
    }
  } else {
    return { value: queryParamsValue, operator: "" };
  }
};
