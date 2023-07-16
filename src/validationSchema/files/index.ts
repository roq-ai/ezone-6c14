import * as yup from 'yup';

export const fileValidationSchema = yup.object().shape({
  name: yup.string().required(),
  game_section_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
