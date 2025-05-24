"use client";

import { Musics } from "@/components/musics";
import { PlaylistForm } from "@/components/playlistForm";
import { Playlist } from "@/components/playlists";
import { Grid } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PlaylistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [playlistId, setPlaylistId] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const { data: playlistData } = useFetch<Playlist>(
    `http://localhost:3000/playlists/${playlistId}`,
    {
      autoInvoke: !!playlistId,
    }
  );

  async function handleSubmit(updatedPlaylist: Playlist) {
    try {
      setIsLoading(true);
      await fetch(`http://localhost:3000/playlists/${playlistId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPlaylist),
      });
      router.back();
    } catch {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    params.then(({ id }) => setPlaylistId(id));
  }, [params]);

  return (
    <Grid gutter={"xl"}>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <PlaylistForm
          handleSubmit={handleSubmit}
          playlistData={playlistData}
          isLoading={isLoading}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 9 }}>
        {playlistData?.musics && <Musics musics={playlistData?.musics} />}
      </Grid.Col>
    </Grid>
  );
}
