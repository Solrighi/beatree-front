import { useForm } from "@mantine/form";
import { Music } from "../musics";
import { useEffect } from "react";
import { Button, Group, NumberInput, Stack, TextInput } from "@mantine/core";

interface Props {
  handleSubmit: (musicData: Music) => void;
  musicData?: Music | null;
  isLoading?: boolean;
}

export function MusicForm({ musicData, handleSubmit, isLoading }: Props) {
  const form = useForm<Music>({
    mode: "uncontrolled",
  });

  useEffect(() => {
    if (!musicData) return;

    form.setValues({
      name: musicData?.name,
      artist: musicData?.artist,
      album: musicData?.album,
      year: musicData?.year,
    });
  }, [musicData]);

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Stack>
        <TextInput
          withAsterisk
          label="Nome"
          placeholder="Nome da Música"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="Artista"
          placeholder="Quem é o artista da música?"
          key={form.key("artist")}
          {...form.getInputProps("artist")}
        />
        <TextInput
          label="Album"
          placeholder="Você sabe o álbum desta musica?"
          key={form.key("album")}
          {...form.getInputProps("album")}
        />
        <NumberInput
          label="Ano de lançamento"
          placeholder="Você lembra quando lançou?"
          key={form.key("year")}
          {...form.getInputProps("year")}
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
