import { useDisclosure, useFetch } from "@mantine/hooks";
import {
  ActionIcon,
  Button,
  Group,
  Menu,
  Table,
  TableData,
} from "@mantine/core";
import { ModalAddToPlaylist } from "../modalAddToPlaylist";
import {
  IconCopyX,
  IconDotsVertical,
  IconPencil,
  IconPlaylistAdd,
  IconPlus,
} from "@tabler/icons-react";
import { useState } from "react";
import { CreateMusic } from "../createMusic";

export interface Music {
  _id: string;
  name: string;
  artist: string;
  album: string;
  year: number;
}

interface Props {
  isPlaylistMusics?: boolean;
  musics?: Music[];
  onRemove?: (musicId: string) => void;
}

export function Musics({ isPlaylistMusics, musics, onRemove }: Props) {
  const [isAddToPlaylistModalOpened, addToPlaylistModalHandlers] =
    useDisclosure(false);
  const [isMusicModalOpened, musicModalHandlers] = useDisclosure(false);
  const [selectedMusic, setSelectedMusic] = useState<Music>();

  const { data, refetch } = useFetch<Music[]>("http://localhost:3000/musics", {
    autoInvoke: !musics?.length,
  });

  const fetchedMusics = musics || data;

  async function deleteMusic(musicId: string) {
    try {
      await fetch(`http://localhost:3000/musics`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: [musicId] }),
      });
      refetch();
    } catch {}
  }

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
                setSelectedMusic(music);
                addToPlaylistModalHandlers.open();
              }}
            >
              Salvar na playlist
            </Menu.Item>
            <Menu.Item
              leftSection={<IconPencil />}
              onClick={() => {
                setSelectedMusic(music);
                musicModalHandlers.open();
              }}
            >
              Editar
            </Menu.Item>
            <Menu.Item
              color="red"
              leftSection={<IconCopyX />}
              onClick={() => {
                if (onRemove) {
                  onRemove(music._id);
                } else {
                  deleteMusic(music._id);
                }
              }}
            >
              Remover
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
        selectedMusicId={selectedMusic?._id || ""}
        isOpen={isAddToPlaylistModalOpened}
        onClose={addToPlaylistModalHandlers.close}
      />
      <CreateMusic
        isOpen={isMusicModalOpened}
        onClose={() => {
          musicModalHandlers.close();
          setSelectedMusic(undefined);
          refetch();
        }}
        musicData={selectedMusic}
      />
      {!isPlaylistMusics && (
        <Group justify="flex-end">
          <Button
            onClick={musicModalHandlers.open}
            leftSection={<IconPlus />}
            type="submit"
            color="teal"
          >
            Nova Música
          </Button>
        </Group>
      )}
      <Table data={tableData} />
    </>
  );
}
