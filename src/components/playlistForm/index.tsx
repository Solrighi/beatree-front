import { Stack, TextInput, Checkbox, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Playlist } from "../playlists";
import { useEffect } from "react";

interface Props {
  handleSubmit: (playlistData: Playlist) => void;
  playlistData?: Playlist | null;
  isLoading?: boolean;
}

export function PlaylistForm({ playlistData, handleSubmit, isLoading }: Props) {
  const form = useForm<Playlist>({
    mode: "uncontrolled",
  });

  useEffect(() => {
    if (!playlistData) return;

    form.setValues({
      name: playlistData?.name,
      createdBy: playlistData?.createdBy,
      isPublic: playlistData?.isPublic,
    });
  }, [playlistData]);

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack>
        <TextInput
          withAsterisk
          label="Nome"
          placeholder="Nome da playlist"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="Criado por"
          placeholder="Quem está criando a playlist"
          key={form.key("createdBy")}
          {...form.getInputProps("createdBy")}
        />
        <Checkbox
          labelPosition="left"
          label="Esta playlist é pública?"
          key={form.key("isPublic")}
          {...form.getInputProps("isPublic", { type: "checkbox" })}
        />
        <Group justify="center" mt="md">
          <Button type="submit" color="green" loading={isLoading}>
            Salvar
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
