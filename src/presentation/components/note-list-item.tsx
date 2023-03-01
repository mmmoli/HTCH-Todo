import { FC, ReactNode } from "react";

export type NoteListItemProps = {
  title: ReactNode;
};

export const NoteListItem: FC<NoteListItemProps> = ({ title }) => {
  return <div>{JSON.stringify(title)}</div>;
};
