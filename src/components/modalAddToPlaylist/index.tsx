import { Button, Modal, Stack } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { Playlist } from "../playlists";
import { useEffect, useState } from "react";

interface Props {
  selectedMusicId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ModalAddToPlaylist({
  selectedMusicId,
  isOpen,
  onClose,
}: Props) {
  const { data, refetch } = useFetch<Playlist[]>(
    "http://localhost:3000/playlists",
    { autoInvoke: false }
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleAddMusic(playlistId: string) {
    try {
      setIsLoading(true);
      await fetch(
        `http://localhost:3000/playlists/${playlistId}/music/${selectedMusicId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      onClose();
    } catch {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    refetch();
  }, [isOpen]);

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Selecione a Playlist"
      centered
    >
      <Stack gap={0}>
        {data?.map((playlist) => {
          return (
            <Button
              variant="subtle"
              loading={isLoading}
              onClick={() => handleAddMusic(playlist._id)}
              key={playlist._id}
            >
              {playlist.name}
            </Button>
          );
        })}
      </Stack>
    </Modal>
  );
}
