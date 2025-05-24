import { useFetch } from "@mantine/hooks";
import { Table, TableData } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Music } from "../musics";

interface Item {
  name: string;
  createdBy: string;
  isPublic: string;
  musics: Music[];
}

export function Playlists() {
  const { data } = useFetch<Item[]>("http://localhost:3000/playlists");

  const tableData: TableData = {
    head: ["Nome", "Criado por", "Pública"],
    body: data?.map((playlist) => {
      const publicIcon = playlist.isPublic ? (
        <IconCheck color="lime" />
      ) : (
        <IconX color="red" />
      );
      return [playlist.name, playlist.createdBy, publicIcon];
    }),
  };

  return <Table data={tableData} />;
}
