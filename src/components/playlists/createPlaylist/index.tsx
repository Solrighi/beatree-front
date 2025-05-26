import { Modal } from "@mantine/core";
import { PlaylistForm } from "../playlistForm";
import { Playlist } from "../tablePlaylists";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { PlaylistNotifications } from "@/constants/notifications";
import { IconBug, IconCircleDashedCheck } from "@tabler/icons-react";

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
      notifications.show({
        icon: <IconBug />,
        message: PlaylistNotifications.ERROR_GENERIC,
        color: "red",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
      notifications.show({
        icon: <IconCircleDashedCheck />,
        message: PlaylistNotifications.CREATED,
        color: "teal",
      });
    }
  }

  return (
    <Modal opened={isOpen} onClose={onClose} title="Nova playlist" centered>
      <PlaylistForm handleSubmit={handleSubmit} isLoading={isLoading} />
    </Modal>
  );
}
