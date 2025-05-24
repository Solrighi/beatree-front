import { useFetch } from "@mantine/hooks";
import { Table, TableData } from "@mantine/core";

export interface Music {
  name: string;
  artist: string;
  album: string;
  year: number;
}

interface Props {
  musics?: Music[];
}

export function Musics({ musics }: Props) {
  const { data } = useFetch<Music[]>("http://localhost:3000/musics", {
    autoInvoke: !musics?.length,
  });

  const fetchedMusics = musics || data;

  const tableData: TableData = {
    head: ["Nome", "Artista", "Album", "Ano"],
    body: fetchedMusics?.map((music) => {
      return [music.name, music.artist, music.album, music.year];
    }),
  };

  return <Table data={tableData} />;
}
