import { Request, Response, NextFunction } from "express";

import {
  validateAgainstRegex,
  errorChecker,
  magicTrimmer,
  nameRegex,
  dateRegex,
} from "@modules/validator";

import { sendErrorResponse } from "@modules/sendResponse";
import { getOnlyValueFromQueryData } from "@utils/index";

export const validator = (req: Request, res: Response, next: NextFunction) => {
  const {
    cost,
    percentagePer,
    salesOutcome,
    name,
    date: dateValue,
  } = req.query;

  const costValue = getOnlyValueFromQueryData(cost);

  const percentagePerValue = getOnlyValueFromQueryData(percentagePer);

  const salesOutcomeValue = getOnlyValueFromQueryData(salesOutcome);

  const nameValue = getOnlyValueFromQueryData(name);

  const data = magicTrimmer({
    costValue,
    percentagePerValue,
    salesOutcomeValue,
    nameValue,
  });

  const validationSchema = {
    ...(name && {
      name: validateAgainstRegex(data.nameValue, "name", nameRegex),
    }),

    ...(percentagePerValue && {
      percentagePer: validateAgainstRegex(
        data.percentagePerValue,
        "percentagePer"
      ),
    }),

    ...(cost && {
      cost: validateAgainstRegex(data.costValue, "cost"),
    }),

    ...(salesOutcome && {
      salesOutcome: validateAgainstRegex(
        data.salesOutcomeValue,
        "salesOutcome"
      ),
    }),

    ...(dateValue && {
      gain: validateAgainstRegex(dateValue.toString(), "date", dateRegex),
    }),
  };

  const errors = errorChecker(validationSchema);

  if (errors) return sendErrorResponse(res, 422, errors);

  next();
};
