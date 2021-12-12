import { ObjectProps } from "@utils/types";

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
      return { value: queryParamsValue["lte"], operator: "lte" };
    }

    if (queryParamsValue["gte"]) {
      return { value: queryParamsValue["gte"], operator: "gte" };
    }
  } else {
    return { value: queryParamsValue, operator: "eql" };
  }
};

export const getFilterCondition = (value: any, filterParam: any) => {
  switch (filterParam.operator) {
    case "lte": {
      return value <= filterParam.value;
    }

    case "gte": {
      return value >= filterParam.value;
    }

    case "eql": {
      return value === filterParam.value;
    }

    default: {
      return false;
    }
  }
};
