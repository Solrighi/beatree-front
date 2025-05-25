import { useState } from "react";
import { Music } from "../musics";
import { Modal } from "@mantine/core";
import { MusicForm } from "../musicForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  musicData?: Music | null;
}

export function CreateMusic({ isOpen, onClose, musicData }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function createMusic(newMusic: Music) {
    await fetch(`http://localhost:3000/musics`, {
      method: musicData ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMusic),
    });
  }

  async function updateMusic(newMusic: Music) {
    await fetch(`http://localhost:3000/musics/${musicData?._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMusic),
    });
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
    <Modal opened={isOpen} onClose={onClose} title="Nova música" centered>
      <MusicForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        musicData={musicData}
      />
    </Modal>
  );
}
