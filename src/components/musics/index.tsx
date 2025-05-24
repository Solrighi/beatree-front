import { useDisclosure, useFetch } from "@mantine/hooks";
import { ActionIcon, Menu, Table, TableData } from "@mantine/core";
import { ModalAddToPlaylist } from "../modalAddToPlaylist";
import { IconDotsVertical, IconPlaylistAdd } from "@tabler/icons-react";
import { useState } from "react";

export interface Music {
  _id: string;
  name: string;
  artist: string;
  album: string;
  year: number;
}

interface Props {
  musics?: Music[];
}

export function Musics({ musics }: Props) {
  const [isModalOpened, modalHandlers] = useDisclosure(false);
  const [selectedMusicId, setSelectedMusicId] = useState<string>("");

  const { data } = useFetch<Music[]>("http://localhost:3000/musics", {
    autoInvoke: !musics?.length,
  });

  const fetchedMusics = musics || data;

  const tableData: TableData = {
    head: ["Nome", "Artista", "Album", "Ano", ""],
    body: fetchedMusics?.map((music) => {
      const modal = (
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon variant="subtle" aria-label="Settings" color="violet">
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconPlaylistAdd />}
              onClick={() => {
                setSelectedMusicId(music._id);
                modalHandlers.open();
              }}
            >
              Salvar na playlist
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      );

      return [music.name, music.artist, music.album, music.year, modal];
    }),
  };

  return (
    <>
      <ModalAddToPlaylist
        selectedMusicId={selectedMusicId}
        isOpen={isModalOpened}
        onClose={modalHandlers.close}
      />
      <Table data={tableData} />
    </>
  );
}
