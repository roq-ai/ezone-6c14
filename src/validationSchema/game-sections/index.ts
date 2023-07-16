import * as yup from 'yup';

export const gameSectionValidationSchema = yup.object().shape({
  name: yup.string().required(),
  server_id: yup.string().nullable().required(),
});
