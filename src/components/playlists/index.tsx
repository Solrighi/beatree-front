import { useFetch } from "@mantine/hooks";
import { ActionIcon, Table, TableData } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { Music } from "../musics";
import Link from "next/link";

export interface Playlist {
  _id: string;
  name: string;
  createdBy: string;
  isPublic: string;
  musics: Music[];
}

export function Playlists() {
  const { data } = useFetch<Playlist[]>("http://localhost:3000/playlists");

  const tableData: TableData = {
    head: ["Nome", "Criado por", "Pública", ""],
    body: data?.map((playlist) => {
      const publicIcon = playlist.isPublic ? (
        <IconCheck color="lime" />
      ) : (
        <IconX color="red" />
      );

      const viewButton = (
        <ActionIcon
          href={`/playlist/${playlist._id}`}
          component={Link}
          variant="subtle"
          aria-label="edit"
          color="violet"
        >
          <IconPencil stroke={1.5} />
        </ActionIcon>
      );
      return [playlist.name, playlist.createdBy, publicIcon, viewButton];
    }),
  };

  return <Table data={tableData} />;
}
