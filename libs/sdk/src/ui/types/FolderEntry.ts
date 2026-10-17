// A subfolder shown as a card in the action list; its actions stay hidden until it is opened.
export type FolderEntry = {
  path: string;
  // Actions anywhere inside, subfolders included.
  actionCount: number;
};
