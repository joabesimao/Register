import {
  OptionalFieldTypeValidation,
  ValidationComposite,
} from "../../presentation/helpers/validators";
import { Validation } from "../../presentation/protocols/validation";

export const makeUpdateProductValidation = (): ValidationComposite => {
  const validations: Validation[] = [
    new OptionalFieldTypeValidation("name", "string"),
    new OptionalFieldTypeValidation("price", "number"),
    new OptionalFieldTypeValidation("description", "string"),
    new OptionalFieldTypeValidation("category", "string"),
  ];
  return new ValidationComposite(validations);
};
