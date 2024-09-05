import { atom, useAtom } from "jotai";

export const createChannelModalAtom = atom(false);

export const useCreateChannelModal = () => {
  return useAtom(createChannelModalAtom);
};
