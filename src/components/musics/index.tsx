import { useFetch } from "@mantine/hooks";
import { Table, TableData } from "@mantine/core";

export interface Music {
  name: string;
  artist: string;
  album: string;
  year: number;
}

export function Musics() {
  const { data } = useFetch<Music[]>("http://localhost:3000/musics");

  const tableData: TableData = {
    head: ["Nome", "Artista", "Album", "Ano"],
    body: data?.map((music) => {
      return [music.name, music.artist, music.album, music.year];
    }),
  };

  return <Table data={tableData} />;
}
