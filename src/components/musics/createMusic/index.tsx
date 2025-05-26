import { useState } from "react";
import { Music } from "../tableMusics";
import { Modal } from "@mantine/core";
import { MusicForm } from "../musicForm";
import { notifications } from "@mantine/notifications";
import { MusicNotifications } from "@/constants/notifications";
import { IconBug, IconFilePlus, IconPencilCheck } from "@tabler/icons-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  musicData?: Music | null;
}

export function CreateMusic({ isOpen, onClose, musicData }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function createMusic(newMusic: Music) {
    try {
      await fetch(`http://localhost:3000/musics`, {
        method: musicData ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMusic),
      });
    } catch {
      notifications.show({
        icon: <IconBug />,
        message: MusicNotifications.ERROR_GENERIC,
        color: "red",
        autoClose: 5000,
      });
    } finally {
      notifications.show({
        icon: <IconFilePlus />,
        message: MusicNotifications.CREATED,
        color: "teal",
        autoClose: 5000,
      });
    }
  }

  async function updateMusic(newMusic: Music) {
    try {
      await fetch(`http://localhost:3000/musics/${musicData?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMusic),
      });
    } catch {
      notifications.show({
        icon: <IconBug />,
        message: MusicNotifications.ERROR_GENERIC,
        color: "red",
        autoClose: 5000,
      });
    } finally {
      notifications.show({
        icon: <IconPencilCheck />,
        message: MusicNotifications.UPDATED,
        color: "teal",
        autoClose: 5000,
      });
    }
  }

  async function handleSubmit(newMusic: Music) {
    try {
      setIsLoading(true);
      if (musicData?._id) {
        await updateMusic(newMusic);
      } else {
        await createMusic(newMusic);
      }
      onClose();
    } catch {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={musicData ? "Edite sua música" : "Nova música"}
      centered
    >
      <MusicForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        musicData={musicData}
      />
    </Modal>
  );
}
