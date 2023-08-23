import z from "zod";

const wrestlerSchema = z.object({
  name: z.string({
    invalid_type_error: "Name must be a string",
    required_error: "Name is required",
  }),
  nickName: z.string(),
  realName: z.string(),
  stable: z.string(),
  birthPlace: z.string(),
  poster: z.string().url({
    message: "Poster must be a valid URL",
  }),
  promotios: z.array(z.string()),
  finisher: z.array(z.string()),
  championships: z.array(z.string()),
  currentCompany: z.string(),
});

export function validateWrestler(input) {
  return wrestlerSchema.safeParse(input);
}

export function validatePartialWrestler(input) {
  // With partial makes each property optional
  return wrestlerSchema.partial().safeParse(input);
}
