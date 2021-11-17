import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ArchiveFormData = {
  playlistName: string;
  playlistIdOrUrl: string;
  isUrl:boolean;
};

export type ArchiveFormState = ArchiveFormData

export const initialState: ArchiveFormState = null;

const archiveFormSlice = createSlice({
  name: 'archiveForm',
  initialState,
  reducers: {
    setData: (state, action:PayloadAction<ArchiveFormData>) => (
      action.payload
    ),
  },
});

export default archiveFormSlice;