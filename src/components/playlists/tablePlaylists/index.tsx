import { useDisclosure, useFetch } from "@mantine/hooks";
import { ActionIcon, Button, Group, Table, TableData } from "@mantine/core";
import {
  IconBug,
  IconCheck,
  IconCircleMinus,
  IconPencil,
  IconPlus,
  IconTrashX,
  IconX,
} from "@tabler/icons-react";
import { Music } from "../../musics/tableMusics";
import Link from "next/link";
import { CreatePlaylist } from "../createPlaylist";
import { useState } from "react";
import { PlaylistNotifications } from "@/constants/notifications";
import { notifications } from "@mantine/notifications";

export interface Playlist {
  _id: string;
  name: string;
  createdBy: string;
  isPublic: string;
  musics: Music[];
}

export function Playlists() {
  const [isModalOpened, modalHandlers] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data, refetch } = useFetch<Playlist[]>(
    "http://localhost:3000/playlists"
  );

  async function removePlaylist(playlistId: string) {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/playlists`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: [playlistId] }),
      });
      if (!response.ok) {
        throw new Error();
      }
      refetch();
      notifications.show({
        icon: <IconCircleMinus />,
        message: PlaylistNotifications.DELETED,
        color: "teal",
        autoClose: 5000,
      });
    } catch {
      notifications.show({
        icon: <IconBug />,
        message: PlaylistNotifications.ERROR_GENERIC,
        color: "red",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const tableData: TableData = {
    head: ["Nome", "Criado por", "Pública", "Ações"],
    body: data?.map((playlist) => {
      const publicIcon = playlist.isPublic ? (
        <IconCheck color="lime" />
      ) : (
        <IconX color="red" />
      );

      const viewButton = (
        <Group>
          <ActionIcon
            href={`/playlist/${playlist._id}`}
            component={Link}
            variant="subtle"
            aria-label="edit"
            color="violet"
            title="Editar"
          >
            <IconPencil stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            onClick={() => removePlaylist(playlist._id)}
            loading={isLoading}
            variant="subtle"
            aria-label="remove"
            color="red"
          >
            <IconTrashX stroke={1.5} />
          </ActionIcon>
        </Group>
      );
      return [playlist.name, playlist.createdBy, publicIcon, viewButton];
    }),
  };

  return (
    <>
      <Group justify="flex-end">
        <Button
          onClick={modalHandlers.open}
          leftSection={<IconPlus />}
          type="submit"
          color="indigo"
        >
          Nova Playlist
        </Button>
      </Group>
      <Table data={tableData} />
      <CreatePlaylist
        isOpen={isModalOpened}
        onClose={() => {
          modalHandlers.close();
          refetch();
        }}
      />
    </>
  );
}
