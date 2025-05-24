"use client";

import { Musics } from "@/components/musics";
import { Playlist } from "@/components/playlists";
import { Button, Checkbox, Grid, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useFetch } from "@mantine/hooks";
import { useEffect, useState } from "react";

export default function PlaylistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [playlistId, setPlaylistId] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: playlistData } = useFetch<Playlist>(
    `http://localhost:3000/playlists/${playlistId}`,
    {
      autoInvoke: !!playlistId,
    }
  );

  const form = useForm<Playlist>({
    mode: "uncontrolled",
  });

  async function handleSubmit(updatedPlaylist: Playlist) {
    console.log(updatedPlaylist);
    try {
      setIsLoading(true);
      await fetch(`http://localhost:3000/playlists/${playlistId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPlaylist),
      });
    } catch {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    form.setValues({
      name: playlistData?.name,
      createdBy: playlistData?.createdBy,
      isPublic: playlistData?.isPublic,
    });
  }, [playlistData]);

  useEffect(() => {
    params.then(({ id }) => setPlaylistId(id));
  }, [params]);

  return (
    <Grid gutter={"xl"}>
      <Grid.Col span={{ base: 12, md: 3 }}>
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
              placeholder="Quem criou a playlist"
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
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 9 }}>
        {playlistData?.musics && <Musics musics={playlistData?.musics} />}
      </Grid.Col>
    </Grid>
  );
}
