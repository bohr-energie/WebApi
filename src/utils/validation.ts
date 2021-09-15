import { body } from "express-validator";
import { civilities } from "../entity/User";

export const validateCredentials = () => {
  return [
    body("password")
      .isLength({ min: 6 })
      .withMessage("Le mot de passe doit comporter au moins 6 caractères!"),
    body("email").isEmail().withMessage("Veuillez inserer un email valide!"),
  ];
};

export const validateUserInfo = () => [
  body("siret")
    .isString()
    .isLength({ min: 1 })
    .withMessage("SIRET ne doit pas être vide!"),
  body("ape")
    .isString()
    .isLength({ min: 1 })
    .withMessage("APE ne doit pas être vide!"),
  body("address")
    .isString()
    .isLength({ min: 1 })
    .withMessage("L'address ne doit pas être vide!"),
  body("postalcode")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Le code postal ne doit pas être vide!"),
  body("city")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Le ville ne doit pas être vide!"),
  body("pdl")
    .isString()
    .isLength({ min: 14, max: 14 })
    .withMessage("PDL n'est pas valide!"),
  body("name")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Le Prénom ne doit pas être vide!"),
  body("last_name")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Le nom ne doit pas être vide!"),
  body("email").isEmail().withMessage("Veuillez inserer un email valide!"),
  body("phone")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Numéro de telephone invalide!"),
  body("func").optional().isString(),
  body("civility").isString().isIn(civilities).withMessage("Titre invalide!"),
];

export const validateSetPassword = () => [
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit comporter au moins 6 caractères!"),
  body("token").isString().exists(),
  body("resetCount").isBoolean().exists(),
];
export const validateSendMail = () => [
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit comporter au moins 6 caractères!"),
  body("token").isString().exists(),
  body("resetCount").isBoolean().exists(),
];

export const validatePasswordReset = () =>
  body("email").isEmail().withMessage("Veuillez inserer un email valide!");
