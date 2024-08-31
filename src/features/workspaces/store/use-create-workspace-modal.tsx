import { atom, useAtom } from "jotai";

export const createWorkspaceModalAtom = atom(false);

export const useCreateWorkspaceModal = () => {
  return useAtom(createWorkspaceModalAtom);
};
