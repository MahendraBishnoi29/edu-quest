import { createSlice } from "@reduxjs/toolkit";

// interface InitialStateTypes {
//   courseEditor: {
//     sections: Section[];
//     isChapterModalOpen: boolean;
//     isSectionModalOpen: boolean;
//     selectedSectionIndex: number | null;
//     selectedChapterIndex: number | null;
//   };
// }

// const initialState: InitialStateTypes = {
//   courseEditor: {
//     sections: [],
//     isChapterModalOpen: false,
//     isSectionModalOpen: false,
//     selectedSectionIndex: null,
//     selectedChapterIndex: null,
//   },
// };

const initialState = {};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
});

export const {} = globalSlice.actions;

export default globalSlice.reducer;
