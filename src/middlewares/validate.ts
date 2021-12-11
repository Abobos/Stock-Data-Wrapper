import { Request, Response, NextFunction } from "express";

import {
  validateAgainstRegex,
  errorChecker,
  magicTrimmer,
  nameRegex,
} from "@modules/validator";

import { sendErrorResponse } from "@modules/sendResponse";
import { getOnlyValueFromQueryData } from "@utils/index";

export const validator = (req: Request, res: Response, next: NextFunction) => {
  const { cost, percentagePer, gain, loss, name } = req.query;

  const costValue = getOnlyValueFromQueryData(cost);

  const percentagePerValue = getOnlyValueFromQueryData(percentagePer);

  const gainValue = getOnlyValueFromQueryData(gain);

  const lossValue = getOnlyValueFromQueryData(loss);

  const nameValue = getOnlyValueFromQueryData(name);

  console.log({
    costValue,
    percentagePerValue,
    gainValue,
    lossValue,
    nameValue,
  });
  const data = magicTrimmer({
    costValue,
    percentagePerValue,
    gainValue,
    lossValue,
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

    ...(gain && {
      gain: validateAgainstRegex(data.gainValue, "gain"),
    }),

    ...(loss && {
      loss: validateAgainstRegex(data.lossValue, "loss"),
    }),
  };

  const errors = errorChecker(validationSchema);

  if (errors) return sendErrorResponse(res, 422, errors);

  next();
};
