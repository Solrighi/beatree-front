"use client";

import { Musics } from "@/components/musics/tableMusics";
import { PlaylistForm } from "@/components/playlists/playlistForm";
import { Playlist } from "@/components/playlists/tablePlaylists";
import { PlaylistNotifications } from "@/constants/notifications";
import { Grid } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconBug, IconCircleDashedMinus, IconEdit } from "@tabler/icons-react";
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

  const { data: playlistData, refetch } = useFetch<Playlist>(
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
      notifications.show({
        icon: <IconEdit />,
        message: PlaylistNotifications.UPDATED,
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
  async function handleRemoveMusic(musicId: string) {
    try {
      setIsLoading(true);
      await fetch(`http://localhost:3000/playlists/${playlistId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: [musicId] }),
      });
      refetch();
      notifications.show({
        icon: <IconCircleDashedMinus />,
        message: PlaylistNotifications.MUSIC_ON_PLAYLIST_DELETED,
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
        {playlistData?.musics && (
          <Musics
            musics={playlistData?.musics}
            onRemove={handleRemoveMusic}
            isPlaylistMusics={true}
          />
        )}
      </Grid.Col>
    </Grid>
  );
}
