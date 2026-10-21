import type { AppIO } from '../types/AppIO';

export type GetParamsIdOrSelectRecordArgs = {
  id: string | undefined;
  selectTitle: string;
  options: { label: string; value: string }[];
  io: AppIO;
};

// Opened from a row menu the action already has the id; opened from the menu it asks for the record first.
export const getParamsIdOrSelectRecord = async ({ id, selectTitle, options, io }: GetParamsIdOrSelectRecordArgs) => {
  if (id) {
    return id;
  }

  const { value } = await io.select.single(selectTitle, { options });

  return value;
};
