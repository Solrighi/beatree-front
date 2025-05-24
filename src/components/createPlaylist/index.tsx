import { Modal } from "@mantine/core";
import { PlaylistForm } from "../playlistForm";
import { Playlist } from "../playlists";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePlaylist({ isOpen, onClose }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(newPlaylist: Playlist) {
    try {
      setIsLoading(true);
      await fetch(`http://localhost:3000/playlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlaylist),
      });
      onClose();
    } catch {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal opened={isOpen} onClose={onClose} title="Nova playlist" centered>
      <PlaylistForm handleSubmit={handleSubmit} isLoading={isLoading} />
    </Modal>
  );
}
